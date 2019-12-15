import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as fromApp from '../../store/app.reducer'

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

    @Effect({ dispatch: false })
    updateMeta = this.actions$.pipe(
        ofType(UserActions.UPDATE_META),
        withLatestFrom(this.store.select('user')),
        switchMap(([actionData, user]) => {
            return this.http.put(`api/user/`, user.meta)
        }),
        // catchError((error: Error) => {
        //     return of(new UserActions.UserHTTPError(error));
        // })
    );


    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }
}