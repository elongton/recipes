import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/core/models/ingredient.model';

export const BEGIN_CREATE_INGREDIENT = '[Ingredients] Begin Create Ingredient'
export const BEGIN_RETRIEVE_INGREDIENTS = '[Ingredients] Begin Retrieve Ingredients'
export const BEGIN_DELETE_INGREDIENT = '[Ingredients] Begin Delete Ingredient'

export const SUCCESS_CREATE_INGREDIENT = '[Ingredients] Success Create Ingredient'
export const SUCCESS_RETRIEVE_INGREDIENTS = '[Ingredients] Success Retrieve Ingredients'
export const SUCCESS_DELETE_INGREDIENT = '[Ingredients] Success Delete Ingredient'

export const INGREDIENT_HTTP_ERROR = '[Ingredients] Http Error'

export class BeginCreateIngredient implements Action {
    readonly type = BEGIN_CREATE_INGREDIENT;
    constructor(public payload: Ingredient) { }
}
export class BeginDeleteIngredient implements Action {
    readonly type = BEGIN_DELETE_INGREDIENT;
    constructor(public payload: Number) { }
}
export class BeginRetrieveIngredients implements Action {
    readonly type = BEGIN_RETRIEVE_INGREDIENTS;
}


export class SuccessCreateIngredient implements Action {
    readonly type = SUCCESS_CREATE_INGREDIENT;
    constructor(public payload: Ingredient) { }
}
export class SuccessRetrieveIngredients implements Action {
    readonly type = SUCCESS_RETRIEVE_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}
export class SuccessDeleteIngredient implements Action {
    readonly type = SUCCESS_DELETE_INGREDIENT;
    constructor(public payload: Number) { }
}

export class IngredientHTTPError implements Action {
    readonly type = INGREDIENT_HTTP_ERROR;
    constructor(public payload: Error) { }
}


export type IngredientActions
    = BeginCreateIngredient
    | BeginRetrieveIngredients
    | BeginDeleteIngredient

    | SuccessCreateIngredient
    | SuccessRetrieveIngredients
    | SuccessDeleteIngredient

    | IngredientHTTPError