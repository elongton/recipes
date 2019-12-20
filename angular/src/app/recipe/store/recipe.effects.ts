import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import { Recipe } from 'src/app/core/models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class RecipeEffects {
    @Effect()
    retrieveRecipes = this.actions$.pipe(
        ofType(RecipeActions.BEGIN_RETRIEVE_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(`api/recipes/`)
        }),
        map(recipes => {
            return new RecipeActions.SuccessRetrieveRecipes(recipes);
        }),
        catchError((error: Error) => {
            return of(new RecipeActions.RecipeHTTPError(error));
        })
    )

    // @Effect()
    // createRecipe = this.actions$.pipe(
    //     ofType(RecipeActions.BEGIN_CREATE_RECIPE),
    //     switchMap((action: RecipeActions.BeginCreateRecipe) => {

    //     }),
    //     map(recipe => {
    //         console.log(recipe)
    //         return new RecipeActions.SuccessCreateRecipe(recipe);
    //     }),
    //     catchError((error: Error) => {
    //         return of(new RecipeActions.RecipeHTTPError(error));
    //     })
    // )

    @Effect()
    updateRecipe = this.actions$.pipe(
        ofType(RecipeActions.BEGIN_UPDATE_RECIPE),
        switchMap((action: RecipeActions.BeginUpdateRecipe) => {
            return this.http.put<Recipe>(`api/recipes/${action.payload.id}`, action.payload.recipe)
        }),
        map(recipe => {
            return new RecipeActions.SuccessUpdateRecipe(recipe);
        }),
        catchError((error: Error) => {
            return of(new RecipeActions.RecipeHTTPError(error));
        })
    )

    @Effect()
    deleteRecipe = this.actions$.pipe(
        ofType(RecipeActions.BEGIN_DELETE_RECIPE),
        switchMap((action: RecipeActions.BeginDeleteRecipe) => {
            return this.http.delete<Number>(`api/recipes/${action.payload}`)
        }),
        map(id => {
            return new RecipeActions.SuccessDeleteRecipe(id);
        }),
        catchError((error: Error) => {
            return of(new RecipeActions.RecipeHTTPError(error));
        })
    )


    constructor(private actions$: Actions, private http: HttpClient) { }
}