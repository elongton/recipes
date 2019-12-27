import * as UserActions from './user.actions';
import { Recipe } from 'src/app/core/models/recipe.model';

interface RecipeBook {
    recipes: Recipe[]
}

export interface State {
    meta: any,
    recipeBook: RecipeBook,
    shoppingList: any,
    loading: boolean,
    updating: boolean,
}

const initialState = {
    meta: { viewed_recipes: [] },
    recipeBook: { recipes: [] },
    shoppingList: { recipes: [] },
    loading: false,
    updating: false,
}

export function authReducer(state = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.BEGIN_RETRIEVE_USER_DATA:
            return {
                ...state,
                loading: true,
            };
        case UserActions.SUCCESS_RETRIEVE_USER_DATA:
            // console.log(action.payload)
            let incomingRecipeBook = action.payload.recipe_book;
            let incomingShoppingList = action.payload.shopping_list;
            return {
                ...state,
                meta: action.payload.meta,
                recipeBook: incomingRecipeBook ? action.payload.recipe_book : { recipes: [] },
                shoppingList: incomingShoppingList ? action.payload.shopping_list : { recipes: [] },
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
        case UserActions.ADD_TO_RECIPE_BOOK:
            return {
                ...state,
                recipeBook: {
                    recipes: [...state.recipeBook.recipes, action.payload]
                },
                loading: false
            }

        case UserActions.ADD_TO_SHOPPING_LIST:
            return {
                ...state,
                shoppingList: {
                    recipes: [...state.shoppingList.recipes, action.payload]
                },
                loading: false
            }

        case UserActions.BEGIN_UPDATE_RECIPE_BOOK:
            return {
                ...state,
                updating: true,
            }

        case UserActions.SUCCESS_UPDATE_RECIPE_BOOK:
            return {
                ...state,
                recipeBook: action.payload,
                updating: false,
            }

        case UserActions.USER_HTTP_ERROR:
            console.log(action.payload)
            return state;


        default:
            return state;
    }
}




            // const updatedRecipes = [...state.recipeBook.recipes];
            // const indexToUpdate = updatedRecipes.findIndex(recipe => { return recipe.id === action.payload.id })
            // updatedRecipes[indexToUpdate] = action.payload;