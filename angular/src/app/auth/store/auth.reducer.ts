import * as AuthActions from './auth.actions';

export interface State {
    user: any,
    loading: Boolean
}

const initialState = {
    user: null,
    loading: false,
}

function AuthReducer(state: State, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.BEGIN_LOGIN:
            return state;
        case AuthActions.BEGIN_LOGOUT:
            return state;

        default:
            return state;
    }
}