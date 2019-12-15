import { Action } from '@ngrx/store'

export const BEGIN_RETRIEVE_META = '[User] Begin Retrieve Meta'
export const SUCCESS_RETRIEVE_META = '[User] Success Retrieve Meta'

export const UPDATE_META = '[User] Update Meta'

export const USER_HTTP_ERROR = '[User] Http Error'


export class BeginRetrieveMeta implements Action {
    readonly type = BEGIN_RETRIEVE_META
}
export class SuccessRetrieveMeta implements Action {
    readonly type = SUCCESS_RETRIEVE_META
    constructor(public payload: any) { }
}

export class UpdateMeta implements Action {
    readonly type = UPDATE_META
    constructor(public payload: any) { }
}

export class UserHTTPError implements Action {
    readonly type = USER_HTTP_ERROR
    constructor(public payload: Error) { }

}


export type UserActions
    = BeginRetrieveMeta
    | SuccessRetrieveMeta
    | UserHTTPError
    | UpdateMeta