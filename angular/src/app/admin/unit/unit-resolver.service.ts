import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import { take, map, } from "rxjs/operators";
import * as UnitActions from './store/unit.actions'

@Injectable({ providedIn: 'root' })
export class UnitResolverService implements Resolve<any>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('units').pipe(
            take(1),
            map(units => {
                if (units.units.length == 0) {
                    console.log('dispatched retrieve')
                    this.store.dispatch(new UnitActions.BeginRetrieveUnitsAndTypes)
                }
                return this.actions$.pipe(ofType(UnitActions.BEGIN_RETRIEVE_UNITS_AND_TYPES), take(1));
            }));
    }
}