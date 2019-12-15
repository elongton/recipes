import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { of, from } from 'rxjs';

import * as AuthActions from './user.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    // @Effect()
    // login = this.actions$.pipe(
    //     ofType(AuthActions.BEGIN_LOGIN),
    //     switchMap(() => {
    //         return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
    //     }),
    //     map(user => {
    //         this.ngZone.run(() => this.router.navigate(['/']));
    //         return new AuthActions.SuccessLogin(user.user.displayName);
    //     }),
    //     catchError((error: Error) => {
    //         return of(new AuthActions.AuthHTTPError(error));
    //     })
    // )


    // @Effect()
    // logout = this.actions$.pipe(
    //     ofType(AuthActions.BEGIN_LOGOUT),
    //     switchMap(() => {
    //         return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
    //     }),
    //     map(user => {
    //         this.ngZone.run(() => this.router.navigate(['/']));
    //         return new AuthActions.SuccessLogin(user.user.displayName);
    //     }),
    //     catchError((error: Error) => {
    //         return of(new AuthActions.AuthHTTPError(error));
    //     })
    // )



    constructor(private actions$: Actions, ) { }
}