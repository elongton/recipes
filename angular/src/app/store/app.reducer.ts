import { ActionReducerMap } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

import * as fromRecipes from '../recipe/store/recipe.reducer';
import * as fromTags from '../admin/tag/store/tag.reducer';
import * as fromIngredients from '../admin/ingredient/store/ingredient.reducer';
import * as fromUnits from '../admin/unit/store/unit.reducer';
import * as fromGeneral from './general/general.reducer';
import * as fromUser from '../user/store/user.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    recipes: fromRecipes.State
    tags: fromTags.State
    ingredients: fromIngredients.State
    units: fromUnits.State
    general: fromGeneral.State
    user: fromUser.State
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
    recipes: fromRecipes.recipeReducer,
    tags: fromTags.tagReducer,
    ingredients: fromIngredients.ingredientReducer,
    units: fromUnits.unitReducer,
    general: fromGeneral.generalReducer,
    user: fromUser.userReducer,
    auth: fromAuth.authReducer,

}

export function logout(reducer) {
    return function (state, action) {
        return reducer(action.type === AuthActions.LOGOUT ? undefined : state, action);
    }
}