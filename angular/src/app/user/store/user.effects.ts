import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    @Effect()
    getMeta = this.actions$.pipe(
        ofType(UserActions.BEGIN_RETRIEVE_META),
        switchMap(() => {
            return this.http.get(`api/user/`);
        }),
        map(meta => {
            console.log(meta)
            return new UserActions.SuccessRetrieveMeta(meta);
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    )

    @Effect()
    updateMeta = this.actions$.pipe(
        ofType(UserActions.UPDATE_META),
        map((action: UserActions.UpdateMeta) => {
            return this.http.put(`api/user/`, action.payload)
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    )


    constructor(private actions$: Actions, private http: HttpClient) { }
}