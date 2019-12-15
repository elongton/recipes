import * as UserActions from './user.actions';

export interface State {
    user: any,
    loading: Boolean
}

const initialState = {
    user: null,
    loading: false,
}

export function authReducer(state = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        // case AuthActions.BEGIN_LOGIN:
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        // case AuthActions.BEGIN_LOGOUT:
        //     return {
        //         ...state,
        //         loading: true,
        //     }

        // case AuthActions.SUCCESS_LOGIN:
        //     return {
        //         ...state,
        //         user: action.payload,
        //         loading: false,
        //     }

        default:
            return state;
    }
}