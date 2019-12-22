import * as UserActions from './user.actions';
import { Recipe } from 'src/app/core/models/recipe.model';

interface RecipeBook {
    recipes: Recipe[]
}

export interface State {
    meta: any,
    recipeBook: RecipeBook,
    loading: Boolean
}

const initialState = {
    meta: { viewed_recipes: [] },
    recipeBook: { recipes: [] },
    loading: false,
}

export function authReducer(state = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.BEGIN_RETRIEVE_USER_DATA:
            return {
                ...state,
                loading: true,
            };
        case UserActions.SUCCESS_RETRIEVE_USER_DATA:
            return {
                ...state,
                meta: action.payload.meta,
                recipeBook: action.payload.recipe_book,
                loading: false,
            };

        case UserActions.UPDATE_META:
            let updated_viewed_recipes = [...state.meta.viewed_recipes]
            if (!updated_viewed_recipes.includes(+action.payload)) {
                updated_viewed_recipes.push(+action.payload)
            }
            return {
                ...state,
                meta: {
                    ...state.meta,
                    viewed_recipes: updated_viewed_recipes,
                }

            }
        // case UserActions.UPDATE_RECIPE_BOOK:
        //     let updated_recipe_book = [...state.recipeBook]
        //     return state;
        case UserActions.ADD_TO_RECIPE_BOOK:
            return {
                ...state,
                recipeBook: {
                    recipes: [...state.recipeBook.recipes, action.payload]
                },
                loading: false
            }
        case UserActions.USER_HTTP_ERROR:
            console.log(action.payload)
            return state;


        default:
            return state;
    }
}


