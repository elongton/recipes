import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/core/models/recipe.model';

export const BEGIN_CREATE_RECIPE = '[Recipes] Begin Create Recipe';
export const BEGIN_RETRIEVE_RECIPES = '[Recipes] Begin Retrieve Recipes';
export const BEGIN_UPDATE_RECIPE = '[Recipes] Begin Update Recipe';
export const BEGIN_DELETE_RECIPE = '[Recipes] Begin Delete Recipe';


export const SUCCESS_CREATE_RECIPE = '[Recipes] Success Create Recipe';
export const SUCCESS_RETRIEVE_RECIPES = '[Recipes] Success Retrieve Recipes';
export const SUCCESS_UPDATE_RECIPE = '[Recipes] Success Update Recipe';
export const SUCCESS_DELETE_RECIPE = '[Recipes] Success Delete Recipe';

export const RECIPE_HTTP_ERROR = '[Recipes] Some HTTP Error';


export class BeginCreateRecipe implements Action {
    readonly type = BEGIN_CREATE_RECIPE;
    constructor(public payload: Recipe) { }
}
export class BeginRetrieveRecipes implements Action {
    readonly type = BEGIN_RETRIEVE_RECIPES;
    constructor(public payload: Recipe[]) { }
}
export class BeginUpdateRecipe implements Action {
    readonly type = BEGIN_UPDATE_RECIPE;
    constructor(public payload: { recipe: Recipe, id: Number }) { }
}
export class BeginDeleteRecipe implements Action {
    readonly type = BEGIN_DELETE_RECIPE;
    constructor(public payload: Number) { }
}


export class SuccessCreateRecipe implements Action {
    readonly type = SUCCESS_CREATE_RECIPE;
    constructor(public payload: Recipe) { }
}
export class SuccessRetrieveRecipes implements Action {
    readonly type = SUCCESS_RETRIEVE_RECIPES;
    constructor(public payload: Recipe[]) { }
}
export class SuccessUpdateRecipe implements Action {
    readonly type = SUCCESS_UPDATE_RECIPE;
    constructor(public payload: Recipe) { }
}
export class SuccessDeleteRecipe implements Action {
    readonly type = SUCCESS_DELETE_RECIPE;
    constructor(public payload: Number) { }
}



export class RecipeHTTPError implements Action {
    readonly type = RECIPE_HTTP_ERROR;
    constructor(public payload: Error) { }
}



export type RecipeActions
    = BeginCreateRecipe
    | BeginRetrieveRecipes
    | BeginUpdateRecipe
    | BeginDeleteRecipe

    | SuccessCreateRecipe
    | SuccessRetrieveRecipes
    | SuccessUpdateRecipe
    | SuccessDeleteRecipe

    | RecipeHTTPError