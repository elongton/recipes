import { Injectable } from "@angular/core";
import { Recipe } from '../core/models/recipe.model';
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('resolve triggered')
        this.store.dispatch(new RecipeActions.RetrieveRecipes())
        return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
    }

}