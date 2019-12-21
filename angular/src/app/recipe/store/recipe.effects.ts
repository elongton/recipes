import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Router } from "@angular/router";


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


    @Effect({ dispatch: false })
    createRecipe = this.actions$.pipe(
        ofType(RecipeActions.SUCCESS_CREATE_RECIPE),
        map((action: RecipeActions.SuccessCreateRecipe) => {
            this.router.navigate([`/recipe/view/${action.payload.id}`])
        }),
    )
    @Effect({ dispatch: false })
    updateRecipe = this.actions$.pipe(
        ofType(RecipeActions.SUCCESS_UPDATE_RECIPE),
        map((action: RecipeActions.SuccessUpdateRecipe) => {
            this.router.navigate([`/recipe/view/${action.payload.id}`])
        }),
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


    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
}