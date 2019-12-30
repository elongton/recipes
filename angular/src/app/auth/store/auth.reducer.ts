import * as AuthActions from './auth.actions';
import { User } from '../../core/models/user.model';

export type State = {
    uid: string;
    displayName: string;
    firstName: string;
    picture: string;
    loading?: boolean;
    error?: string;
}

const initialState = {
    uid: null,
    displayName: 'GUEST',
    firstName: 'none',
    picture: null,
}


/// Reducer function
export function authReducer(state: User = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {

        case AuthActions.GET_USER:
            return { ...state, loading: true };

        case AuthActions.AUTHENTICATED:
            return { ...state, ...action.payload, loading: false };

        case AuthActions.NOT_AUTHENTICATED:
            return { ...state, ...initialState, loading: false };

        case AuthActions.GOOGLE_LOGIN:
            return { ...state, loading: true };

        case AuthActions.AUTH_ERROR:
            return { ...state, ...action.payload, loading: false };

        case AuthActions.LOGOUT:
            return { ...state, loading: true };

        default:
            return state;

    }
}