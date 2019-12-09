import { Ingredient } from '../../../core/models/ingredient.model';
import * as IngredientActions from './ingredient.actions';



export interface State {
    ingredients: Ingredient[],
    loading: boolean
}

const initialState = {
    ingredients: [],
    loading: false,
}




export function ingredientReducer(state = initialState, action: IngredientActions.IngredientActions) {
    switch (action.type) {
        case IngredientActions.BEGIN_CREATE_INGREDIENT:
            return {
                ...state,
                loading: true
            };
        case IngredientActions.BEGIN_RETRIEVE_INGREDIENTS:
            return {
                ...state,
                loading: true
            };
        case IngredientActions.BEGIN_DELETE_INGREDIENT:
            return {
                ...state,
                loading: true
            };


        case IngredientActions.SUCCESS_CREATE_INGREDIENT:
            return state;

        case IngredientActions.SUCCESS_RETRIEVE_INGREDIENTS:
            return {
                ...state,
                ingredients: [...action.payload],
                loading: false,
            }
        case IngredientActions.SUCCESS_DELETE_INGREDIENT:
            return state;


        default:
            return state;
    }


}