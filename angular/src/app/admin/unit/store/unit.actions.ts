import { Action } from '@ngrx/store';
import { Unit, UnitType } from 'src/app/core/models/unit.model';

export const BEGIN_CREATE_UNIT = '[Unit] Begin Create Unit'
export const BEGIN_RETRIEVE_UNITS_AND_TYPES = '[Unit] Begin Retrieve Units and Unit Types'
export const BEGIN_DELETE_UNIT = '[Unit] Begin Delete Unit'


export const SUCCESS_CREATE_UNIT = '[Unit] Success Create Unit'
export const SUCCESS_RETRIEVE_UNITS_AND_TYPES = '[Unit] Success Retrieve Units and Unit Types'
export const SUCCESS_DELETE_UNIT = '[Unit] Success Delete Unit'

export const UNIT_HTTP_ERROR = '[Unit] Http Error'

export class BeginCreateUnit implements Action {
    readonly type = BEGIN_CREATE_UNIT;
    constructor(public payload: Unit) { }
}
export class BeginRetrieveUnitsAndTypes implements Action {
    readonly type = BEGIN_RETRIEVE_UNITS_AND_TYPES
}
export class BeginDeleteUnit implements Action {
    readonly type = BEGIN_DELETE_UNIT;
    constructor(public payload: Number) { }
}


export class SuccessCreateUnit implements Action {
    readonly type = SUCCESS_CREATE_UNIT;
    constructor(public payload: Unit) { }
}
export class SuccessRetrieveUnitsAndTypes implements Action {
    readonly type = SUCCESS_RETRIEVE_UNITS_AND_TYPES
    constructor(public payload: { units: Unit[], types: UnitType[] }) { }
}
export class SuccessDeleteUnit implements Action {
    readonly type = SUCCESS_DELETE_UNIT;
    constructor(public payload: Number) { }
}

export class UnitHTTPError implements Action {
    readonly type = UNIT_HTTP_ERROR;
    constructor(public payload: Error) { }
}

export type UnitActions
    = BeginCreateUnit
    | BeginRetrieveUnitsAndTypes
    | BeginDeleteUnit
    | SuccessCreateUnit
    | SuccessRetrieveUnitsAndTypes
    | SuccessDeleteUnit
    | UnitHTTPError
    ;