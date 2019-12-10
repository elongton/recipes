import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import { take, map, switchMap, tap } from "rxjs/operators";
import * as IngredientActions from './store/ingredient.actions';

@Injectable({ providedIn: 'root' })
export class IngredientResolverService implements Resolve<any>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('ingredients').pipe(
            take(1),
            map(ingredients => {
                if (ingredients.ingredients.length == 0) { this.store.dispatch(new IngredientActions.BeginRetrieveIngredients) }
                return this.actions$.pipe(ofType(IngredientActions.BEGIN_RETRIEVE_INGREDIENTS), take(1));
            }));
    }
}