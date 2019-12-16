import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as IngredientActions from './ingredient.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class IngredientEffects {
    @Effect()
    retrieveIngredients = this.actions$.pipe(
        ofType(IngredientActions.BEGIN_RETRIEVE_INGREDIENTS),
        switchMap(() => {
            return this.http.get<Ingredient[]>(`api/ingredients`)
        }),
        map(ingredients => {
            return new IngredientActions.SuccessRetrieveIngredients(ingredients);
        }),
        catchError((error: Error) => {
            return of(new IngredientActions.IngredientHTTPError(error));
        })
    )

    @Effect()
    createIngredient = this.actions$.pipe(
        ofType(IngredientActions.BEGIN_CREATE_INGREDIENT),
        switchMap((action: IngredientActions.BeginCreateIngredient) => {
            return this.http.post<Ingredient>(`/api/ingredients/create/`, action.payload)
        }),
        map(ingredient => {
            return new IngredientActions.SuccessCreateIngredient(ingredient);
        }),
        catchError((error: Error) => {
            return of(new IngredientActions.IngredientHTTPError(error));
        })
    )

    @Effect()
    deleteIngredient = this.actions$.pipe(
        ofType(IngredientActions.BEGIN_DELETE_INGREDIENT),
        switchMap((action: IngredientActions.BeginDeleteIngredient) => {
            return this.http.delete<Number>(`/api/ingredients/${action.payload}`)
        }),
        map((response) => {
            return new IngredientActions.SuccessDeleteIngredient(response);
        }),
        catchError((error: Error) => {
            return of(new IngredientActions.IngredientHTTPError(error));
        })
    )

    constructor(private actions$: Actions, private http: HttpClient) { }
}