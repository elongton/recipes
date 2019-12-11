import * as GeneralActions from './general.actions';

export type State = {
    refData: any,
    loading: Boolean,
}

const initialState = {
    refData: [],
    loading: false,

}

export function generalReducer(state = initialState, action: GeneralActions.GeneralActions) {
    switch (action.type) {

        case GeneralActions.BEGIN_RETRIEVE_REFDATA:
            return {
                ...state,
                loading: true,
            }
        case GeneralActions.SUCCESS_RETRIEVE_REFDATA:
            return {
                ...state,
                refData: [...action.payload],
                loading: true,
            }

        default:
            return state;

    }

}