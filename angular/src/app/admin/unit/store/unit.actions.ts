import { Action } from '@ngrx/store';
import { Unit } from 'src/app/core/models/unit.model';

export const BEGIN_CREATE_UNIT = '[Unit] Begin Create Unit'
export const BEGIN_RETRIEVE_UNITS = '[Unit] Begin Retrieve Unit'
export const BEGIN_DELETE_UNIT = '[Unit] Begin Delete Unit'


export class BeginCreateUnit implements Action {
    readonly type = BEGIN_CREATE_UNIT;
    constructor(public payload: Unit) { }
}



export type UnitActions
    = BeginCreateUnit
    ;