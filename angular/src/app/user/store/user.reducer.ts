import * as UserActions from './user.actions';

export interface State {
    meta: any,
    loading: Boolean
}

const initialState = {
    meta: { viewed_recipes: [] },
    loading: false,
}

export function authReducer(state = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.BEGIN_RETRIEVE_META:
            return {
                ...state,
                loading: true,
            };
        case UserActions.SUCCESS_RETRIEVE_META:
            return {
                ...state,
                meta: action.payload,
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
        case UserActions.USER_HTTP_ERROR:
            console.log(action.payload)
            return state;


        default:
            return state;
    }
}


