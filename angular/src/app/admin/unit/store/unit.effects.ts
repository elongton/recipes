import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as UnitActions from './unit.actions';
import { Unit, UnitType } from '../../../core/models/unit.model';

@Injectable()
export class UnitEffects {
    // private unit_types = [];
    private units = [];


    @Effect()
    retrieveUnitsAndTypes = this.actions$.pipe(
        ofType(UnitActions.BEGIN_RETRIEVE_UNITS_AND_TYPES),
        switchMap(() => {
            return this.http.get<Unit[]>(`api/units/`)
        }),
        switchMap((units) => {
            this.units = units;
            return this.http.get<UnitType[]>(`api/unit-types/`)
        }),
        map((unit_types) => {
            return new UnitActions.SuccessRetrieveUnitsAndTypes({ units: this.units, types: unit_types })
        }),
        catchError((error: Error) => {
            return of(new UnitActions.UnitHTTPError(error));
        })

    )

    @Effect()
    createUnitType = this.actions$.pipe(
        ofType(UnitActions.BEGIN_CREATE_UNIT_TYPE),
        switchMap((action: UnitActions.BeginCreateUnitType) => {
            return this.http.post(`api/unit-types/create`, action.payload)
        }),
        map(unitType => {
            return new UnitActions.SuccessCreateUnitType(unitType);
        },
            catchError((error: Error) => {
                return of(new UnitActions.UnitHTTPError(error));
            })
        )
    );


    constructor(private actions$: Actions, private http: HttpClient) { }
}

