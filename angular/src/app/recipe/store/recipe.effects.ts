import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { switchMap, map } from 'rxjs/operators';

import { Recipe } from 'src/app/core/models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    @Effect()
    retrieveRecipes = this.actions$.pipe(
        ofType(RecipeActions.RETRIEVE_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(`api/recipes/`)
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes);
        })
    )


    constructor(private actions$: Actions, private http: HttpClient) { }
}