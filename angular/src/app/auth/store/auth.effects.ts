import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    login = this.actions$.pipe(
        ofType(AuthActions.BEGIN_LOGIN),
        switchMap(() => {
            return of('test')
        }),
        map(user => {
            return new AuthActions.SuccessLogin(user);
        }),
        catchError((error: Error) => {
            return of(new AuthActions.AuthHTTPError(error));
        })
    )



    constructor(private actions$: Actions, private http: HttpClient) { }
}