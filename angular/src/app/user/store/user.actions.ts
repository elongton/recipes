import { Action } from '@ngrx/store'
import { Recipe } from 'src/app/core/models/recipe.model'

export const BEGIN_RETRIEVE_USER_DATA = '[User] Begin Retrieve Meta'
export const SUCCESS_RETRIEVE_USER_DATA = '[User] Success Retrieve Meta'


export const UPDATE_META = '[User] Update Meta'

export const BEGIN_UPDATE_RECIPE_BOOK = '[User] Begin Update Recipe Book'
export const SUCCESS_UPDATE_RECIPE_BOOK = '[User] Success Update Recipe Book'
export const ADD_TO_RECIPE_BOOK = '[User] Add Recipe to Recipe Book'
export const ADD_TO_SHOPPING_LIST = '[User] Add Recipe to Shopping List'

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

export class AddToRecipeBook implements Action {
    readonly type = ADD_TO_RECIPE_BOOK
    constructor(public payload: Recipe) { }

}

export class BeginUpdateRecipeBook implements Action {
    readonly type = BEGIN_UPDATE_RECIPE_BOOK
    constructor(public payload: any) { }
}

export class SuccessUpdateRecipeBook implements Action {
    readonly type = SUCCESS_UPDATE_RECIPE_BOOK
    constructor(public payload: any) { }
}

export class AddToShoppingList implements Action {
    readonly type = ADD_TO_SHOPPING_LIST
    constructor(public payload: Recipe) { }
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
    | BeginUpdateRecipeBook
    | SuccessUpdateRecipeBook
    | AddToRecipeBook
    | AddToShoppingList