import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { User } from '../../core/models/user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { of, from } from 'rxjs';
import { map, switchMap, catchError, delay, } from 'rxjs/operators';




import * as userActions from './auth.actions';


@Injectable()
export class UserEffects {

    private googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider);
    }
    constructor(private actions: Actions, private afAuth: AngularFireAuth) { }


    @Effect()
    getUser = this.actions.pipe(
        ofType(userActions.GET_USER),
        map((action: userActions.GetUser) => action.payload),
        switchMap(payload => this.afAuth.authState),
        delay(2000), // delay to show loading spinner, delete me!
        map(authData => {
            if (authData) {
                /// User logged in
                const user = new User(authData.uid, authData.displayName);
                return new userActions.Authenticated(user);
            } else {
                /// User not logged in
                return new userActions.NotAuthenticated();
            }

        }), catchError(err => of(new userActions.AuthError())));


    @Effect()
    login = this.actions.pipe(
        ofType(userActions.GOOGLE_LOGIN),
        map((action: userActions.GoogleLogin) => action.payload),
        switchMap(payload => {
            return from(this.googleLogin());
        }),
        map(credential => {
            // successful login
            return new userActions.GetUser();
        }),
        catchError(err => {
            return of(new userActions.AuthError({ error: err.message }));
        }));


    @Effect()
    logout = this.actions.pipe(
        ofType(userActions.LOGOUT),
        map((action: userActions.Logout) => action.payload),
        switchMap(payload => {
            return of(this.afAuth.auth.signOut());
        }),
        map(authData => {
            return new userActions.NotAuthenticated();
        }),
        catchError(err => of(new userActions.AuthError({ error: err.message }))))


}