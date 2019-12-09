import { Action } from '@ngrx/store';
import { Tag } from 'src/app/core/models/tag.model';


export const BEGIN_CREATE_TAG = '[Tags] Begin Create Tag';
export const BEGIN_RETRIEVE_TAGS = '[Tags] Begin Retrieve Tags';
export const BEGIN_DELETE_TAG = '[Tags] Begin Delete Tag';

export const SUCCESS_CREATE_TAG = '[Tags] Success Create Tag';
export const SUCCESS_RETRIEVE_TAGS = '[Tags] Success Retrieve Tags';
export const SUCCESS_DELETE_TAG = '[Tags] Success Delete Tag';


export const TAG_HTTP_ERROR = '[Tags] tag http error';



export class BeginCreateTag implements Action {
    readonly type = BEGIN_CREATE_TAG;
    constructor(public payload: Tag) { }
}
export class BeginRetrieveTags implements Action {
    readonly type = BEGIN_RETRIEVE_TAGS;
}
export class BeginDeleteTag implements Action {
    readonly type = BEGIN_DELETE_TAG;
    constructor(public payload: Number) { }
}

export class SuccessCreateTag implements Action {
    readonly type = SUCCESS_CREATE_TAG;
    constructor(public payload: Tag) { }
}
export class SuccessRetrieveTags implements Action {
    readonly type = SUCCESS_RETRIEVE_TAGS;
    constructor(public payload: Tag[]) { }
}
export class SuccessDeleteTag implements Action {
    readonly type = SUCCESS_DELETE_TAG;
    constructor(public payload: Number) { }
}


export class TagHTTPError implements Action {
    readonly type = TAG_HTTP_ERROR;
    constructor(public payload: Error) { }
}


export type TagActions
    = BeginCreateTag
    | BeginRetrieveTags
    | BeginDeleteTag

    | SuccessCreateTag
    | SuccessRetrieveTags
    | SuccessDeleteTag

    | TagHTTPError

