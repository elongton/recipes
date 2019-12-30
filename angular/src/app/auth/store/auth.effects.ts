import { Injectable, NgZone } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { User } from '../../core/models/user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { of, from } from 'rxjs';
import { map, switchMap, catchError, delay, } from 'rxjs/operators';




import * as AuthActions from './auth.actions';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthEffects {

    private googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }

    @Effect()
    getUser = this.actions.pipe(
        ofType(AuthActions.GET_USER),
        map((action: AuthActions.GetUser) => action.payload),
        switchMap(payload => this.afAuth.authState),
        map(authData => {
            if (authData) {
                if (this.router.routerState.snapshot.url == '/login') {
                    this.ngZone.run(() => this.router.navigate(['/']));
                }
                let firstName = authData.displayName.split(' ')[0];
                const user = new User(authData.uid, authData.displayName, firstName, authData.photoURL);
                return new AuthActions.Authenticated({ ...user });
            } else {
                return new AuthActions.NotAuthenticated();
            }

        }), catchError(err => of(new AuthActions.AuthError())));


    @Effect()
    login = this.actions.pipe(
        ofType(AuthActions.GOOGLE_LOGIN),
        map((action: AuthActions.GoogleLogin) => action.payload),
        switchMap(payload => {
            return from(this.googleLogin());
        }),
        map(credential => {
            // successful login
            this.ngZone.run(() => this.router.navigate(['/']));
            return new AuthActions.GetUser();
        }),
        catchError(err => {
            return of(new AuthActions.AuthError({ error: err.message }));
        }));


    @Effect()
    logout = this.actions.pipe(
        ofType(AuthActions.LOGOUT),
        map((action: AuthActions.Logout) => action.payload),
        switchMap(payload => {
            return of(this.afAuth.auth.signOut());
        }),
        map(authData => {
            this.ngZone.run(() => this.router.navigate(['/login']));
            return new AuthActions.NotAuthenticated();
        }),
        catchError(err => of(new AuthActions.AuthError({ error: err.message }))))

    constructor(private actions: Actions,
        private afAuth: AngularFireAuth,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private ngZone: NgZone) { }

}