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

        //UNIT TYPE
        case UnitActions.BEGIN_CREATE_UNIT_TYPE:
            return {
                ...state,
                submitting: true,
            }
        case UnitActions.SUCCESS_CREATE_UNIT_TYPE:
            return {
                ...state,
                types: [...state.types, action.payload],
                submitting: false,
            }

        case UnitActions.BEGIN_DELETE_UNIT_TYPE:
            return {
                ...state,
                loading: true,
            }
        case UnitActions.SUCCESS_DELETE_UNIT_TYPE:
            return {
                ...state,
                loading: true,
            }
        //UNIT
        case UnitActions.BEGIN_CREATE_UNIT:
            return {
                ...state,
                submitting: true,
            }

        case UnitActions.SUCCESS_CREATE_UNIT:
            return {
                ...state,
                units: [...state.units, action.payload],
                submitting: false,
            }

        case UnitActions.BEGIN_DELETE_UNIT:
            return {
                ...state,
                submitting: true,
            }
        case UnitActions.SUCCESS_DELETE_UNIT:
            console.log(action.payload)
            return {
                ...state,
                units: [...state.units.filter(unit => {
                    return unit.id != action.payload
                })],
                submitting: false,
            };




        //RETRIEVAL
        case UnitActions.BEGIN_RETRIEVE_UNITS_AND_TYPES:
            console.log('fired begin retrieve action')
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