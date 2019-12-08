import { ActionReducerMap } from '@ngrx/store';


import * as fromRecipe from '../recipe/store/recipe.reducer';


export interface AppState {
    recipes: fromRecipe.State
}


export const appReducer: ActionReducerMap<AppState> = {
    recipes: fromRecipe.recipeReducer,
}