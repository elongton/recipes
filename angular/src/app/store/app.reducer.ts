import { ActionReducerMap } from '@ngrx/store';


import * as fromRecipes from '../recipe/store/recipe.reducer';
import * as fromTags from '../admin/tag/store/tag.reducer';
import * as fromIngredients from '../admin/ingredient/store/ingredient.reducer';
import * as fromUnits from '../admin/unit/store/unit.reducer';

export interface AppState {
    recipes: fromRecipes.State
    tags: fromTags.State
    ingredients: fromIngredients.State
    units: fromUnits.State
}

export const appReducer: ActionReducerMap<AppState> = {
    recipes: fromRecipes.recipeReducer,
    tags: fromTags.tagReducer,
    ingredients: fromIngredients.ingredientReducer,
    units: fromUnits.unitReducer,
}