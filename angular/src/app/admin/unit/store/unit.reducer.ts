import * as UnitActions from './unit.actions';
import { Unit, UnitType } from 'src/app/core/models/unit.model';

export interface State {
    units: Unit[],
    types: UnitType[],
    loading: Boolean,
}
const initialState = {
    units: [],
    types: [],
    loading: false,
}


export function unitReducer(state = initialState, action: UnitActions.UnitActions) {
    switch (action.type) {

        case UnitActions.BEGIN_CREATE_UNIT:
            return {
                ...state,
                loading: true,
            }
        case UnitActions.BEGIN_RETRIEVE_UNITS_AND_TYPES:
            console.log('fired begin retrieve action')
            return {
                ...state,
                loading: true,
            }
        case UnitActions.BEGIN_DELETE_UNIT:
            return {
                ...state,
                loading: true,
            }


        case UnitActions.SUCCESS_RETRIEVE_UNITS_AND_TYPES:
            return {
                ...state,
                units: [...action.payload.units],
                types: [...action.payload.types],
                loading: false,
            }
        default:
            return state;
    }
}