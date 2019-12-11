import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import { take, map, switchMap, tap } from "rxjs/operators";

import * as GeneralActions from './general.actions';

@Injectable({ providedIn: 'root' })
export class GeneralResolverService implements Resolve<any>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('general').pipe(
            take(1),
            map(general => {
                if (general.refData.length == 0) { this.store.dispatch(new GeneralActions.BeginRetrieveRefdata) }
                return this.actions$.pipe(ofType(GeneralActions.BEGIN_RETRIEVE_REFDATA), take(1));
            }));
    }
}