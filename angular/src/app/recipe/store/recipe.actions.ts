//add recipe
//update recipe
//delete recipe
//fetch recipe from server
//storing recipe on server
import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/core/models/recipe.model';


export const SET_RECIPES = '[Recipes] Set Recipes';
export const RETRIEVE_RECIPES = '[Recipes] Retrieve Recipes';


export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class RetrieveRecipes implements Action {
    readonly type = RETRIEVE_RECIPES;
}


export type RecipesActions = SetRecipes;