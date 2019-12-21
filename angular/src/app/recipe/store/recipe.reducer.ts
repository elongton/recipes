import { Recipe } from 'src/app/core/models/recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
    recipes: Recipe[];
    loading: Boolean;
}

const initialState: State = {
    recipes: [],
    loading: false,
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.BEGIN_CREATE_RECIPE:
            return {
                ...state,
                loading: true
            };
        case RecipeActions.BEGIN_RETRIEVE_RECIPES:
            return {
                ...state,
                loading: true
            };
        case RecipeActions.BEGIN_UPDATE_RECIPE:
            return {
                ...state,
                loading: true
            };
        case RecipeActions.BEGIN_DELETE_RECIPE:
            return {
                ...state,
                loading: true
            };


        case RecipeActions.SUCCESS_CREATE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                loading: false
            };
        case RecipeActions.SUCCESS_RETRIEVE_RECIPES:
            return {
                ...state,
                recipes: [...action.payload],
                loading: false
            };
        case RecipeActions.SUCCESS_UPDATE_RECIPE:
            console.log(action.payload)
            const updatedRecipes = [...state.recipes];
            const indexToUpdate = updatedRecipes.findIndex(recipe => { return recipe.id === action.payload.id })
            updatedRecipes[indexToUpdate] = action.payload;
            return {
                ...state,
                recipes: updatedRecipes,
                loading: false
            };

        case RecipeActions.SUCCESS_DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => {
                    recipe.id != action.payload;
                }),
                loading: false
            };

        case RecipeActions.RECIPE_HTTP_ERROR:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}