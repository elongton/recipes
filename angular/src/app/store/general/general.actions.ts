import { Action } from '@ngrx/store';


export const BEGIN_RETRIEVE_REFDATA = '[General] Begin Retrieve RefData'
export const SUCCESS_RETRIEVE_REFDATA = '[General] Success Retrieve RefData'

export const BEGIN_RETRIEVE_STORE_SECTIONS = '[General] Begin Retrieve Store Sections'
export const SUCCESS_RETRIEVE_STORE_SECTIONS = '[General] Success Retrieve Store Sections'

export const GENERAL_HTTP_ERROR = '[General] Http Error'

export class BeginRetrieveRefdata implements Action {
    readonly type = BEGIN_RETRIEVE_REFDATA;
}
export class SuccessRetrieveRefdata implements Action {
    readonly type = SUCCESS_RETRIEVE_REFDATA;
    constructor(public payload: any) { }
}

export class BeginRetrieveStoreSections implements Action {
    readonly type = BEGIN_RETRIEVE_STORE_SECTIONS;
}
export class SuccessRetrieveStoreSections implements Action {
    readonly type = SUCCESS_RETRIEVE_STORE_SECTIONS;
    constructor(public payload: any) { }
}
export class GeneralHTTPError implements Action {
    readonly type = GENERAL_HTTP_ERROR;
    constructor(public payload: Error) { }
}

export type GeneralActions
    = BeginRetrieveRefdata
    | SuccessRetrieveRefdata
    | GeneralHTTPError
    | BeginRetrieveStoreSections
    | SuccessRetrieveStoreSections