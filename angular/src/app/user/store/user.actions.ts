import { Action } from '@ngrx/store'

export const BEGIN_LOGIN = '[Auth] Begin Login'
export const BEGIN_LOGOUT = '[Auth] Begin Logout'


export const SUCCESS_LOGIN = '[Auth] Success Login'
export const SUCCESS_LOGOUT = '[Auth] Success Logout'

export const AUTH_HTTP_ERROR = '[Auth] Http Error'


export class BeginLogin implements Action {
    readonly type = BEGIN_LOGIN
}
export class BeginLogout implements Action {
    readonly type = BEGIN_LOGOUT
}

export class SuccessLogin implements Action {
    readonly type = SUCCESS_LOGIN
    constructor(public payload: any) { }
}
export class SuccessLogout implements Action {
    readonly type = SUCCESS_LOGOUT
}


export class AuthHTTPError implements Action {
    readonly type = AUTH_HTTP_ERROR
    constructor(public payload: Error) { }

}


export type UserActions
    = BeginLogin
    | BeginLogout
    | SuccessLogin
    | SuccessLogout