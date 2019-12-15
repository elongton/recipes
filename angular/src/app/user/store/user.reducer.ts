import * as UserActions from './user.actions';

export interface State {
    meta: any,
    loading: Boolean
}

const initialState = {
    meta: null,
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
            return state


        default:
            return state;
    }
}