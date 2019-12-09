import { ActionReducerMap } from '@ngrx/store';


import * as fromRecipes from '../recipe/store/recipe.reducer';
import * as fromTags from '../admin/tag/store/tag.reducer';

export interface AppState {
    recipes: fromRecipes.State
    tags: fromTags.State
}


export const appReducer: ActionReducerMap<AppState> = {
    recipes: fromRecipes.recipeReducer,
    tags: fromTags.tagReducer,
}