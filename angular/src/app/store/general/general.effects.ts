import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as GeneralActions from './general.actions';

@Injectable()
export class GeneralEffects {
    @Effect()
    retrieveRefdata = this.actions$.pipe(
        ofType(GeneralActions.BEGIN_RETRIEVE_REFDATA),
        switchMap(() => {
            return this.http.get<any[]>(`api/ref/`)
        }),
        map(ref => {
            return new GeneralActions.SuccessRetrieveRefdata(ref);
        }),
        catchError((error: Error) => {
            return of(new GeneralActions.GeneralHTTPError(error));
        })
    )
    @Effect()
    retrieveStoreSections = this.actions$.pipe(
        ofType(GeneralActions.BEGIN_RETRIEVE_STORE_SECTIONS),
        switchMap(() => {
            return this.http.get<any[]>(`/api/store-sections/`)
        }),
        map(storeSections => {
            return new GeneralActions.SuccessRetrieveStoreSections(storeSections);
        }),
        catchError((error: Error) => {
            return of(new GeneralActions.GeneralHTTPError(error));
        })
    )



    constructor(private actions$: Actions, private http: HttpClient) { }
}