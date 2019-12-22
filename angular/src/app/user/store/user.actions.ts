import { Action } from '@ngrx/store'

export const BEGIN_RETRIEVE_USER_DATA = '[User] Begin Retrieve Meta'
export const SUCCESS_RETRIEVE_USER_DATA = '[User] Success Retrieve Meta'


export const UPDATE_META = '[User] Update Meta'
export const UPDATE_RECIPE_BOOK = '[User] Update Recipe Book'

export const USER_HTTP_ERROR = '[User] Http Error'


export class BeginRetrieveUserData implements Action {
    readonly type = BEGIN_RETRIEVE_USER_DATA
}
export class SuccessRetrieveUserData implements Action {
    readonly type = SUCCESS_RETRIEVE_USER_DATA
    constructor(public payload: any) { }
}
export class UpdateMeta implements Action {
    readonly type = UPDATE_META
    constructor(public payload: any) { }
}
export class UpdateRecipeBook implements Action {
    readonly type = UPDATE_RECIPE_BOOK
    constructor(public payload: any) { }
}

export class UserHTTPError implements Action {
    readonly type = USER_HTTP_ERROR
    constructor(public payload: Error) { }

}


export type UserActions
    = BeginRetrieveUserData
    | SuccessRetrieveUserData
    | UserHTTPError
    | UpdateMeta
    | UpdateRecipeBook