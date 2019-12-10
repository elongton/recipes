import * as UnitActions from './unit.actions';
import { Unit } from 'src/app/core/models/unit.model';

export interface State {
    units: Unit[],
    loading: Boolean,
}
const initialState = {
    units: [],
    loading: false,
}


export function unitReducer(state = initialState, action: UnitActions.UnitActions) {
    switch (action.type) {
        default:
            return state;
    }
}