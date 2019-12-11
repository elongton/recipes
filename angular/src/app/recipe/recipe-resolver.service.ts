import { Injectable } from "@angular/core";
import { Recipe } from '../core/models/recipe.model';
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { take, map, switchMap, tap } from "rxjs/operators";
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<any>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('RECIPE resolve triggered')
        return this.store.select('recipes').pipe(
            take(1),
            map(recipes => {
                console.log('resolve triggered')
                if (recipes.recipes.length == 0) { this.store.dispatch(new RecipeActions.BeginRetrieveRecipes) }
                return this.actions$.pipe(ofType(RecipeActions.BEGIN_RETRIEVE_RECIPES), take(1));
            }));
    }
}