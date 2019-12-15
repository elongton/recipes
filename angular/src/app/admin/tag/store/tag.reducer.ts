import * as TagActions from './tag.actions';
import { Tag } from 'src/app/core/models/tag.model';


export interface State {
    tags: Tag[];
    loading: Boolean;
    submitting: Boolean;
}

const initialState: State = {
    tags: [],
    loading: false,
    submitting: false,
}



export function tagReducer(state = initialState, action: TagActions.TagActions) {
    switch (action.type) {
        case TagActions.BEGIN_CREATE_TAG:
            return {
                ...state,
                submitting: true,
            };
        case TagActions.BEGIN_RETRIEVE_TAGS:
            return {
                ...state,
                loading: true,
            };
        case TagActions.BEGIN_DELETE_TAG:
            return {
                ...state,
                submitting: true,
            };


        case TagActions.SUCCESS_CREATE_TAG:
            return {
                ...state,
                tags: [...state.tags, action.payload],
                submitting: false,
            };
        case TagActions.SUCCESS_RETRIEVE_TAGS:
            return {
                ...state,
                tags: [...action.payload],
                loading: false,
            };
        case TagActions.SUCCESS_DELETE_TAG:
            return {
                ...state,
                tags: state.tags.filter(tag => {
                    tag.id != action.payload;
                }),
                submitting: false,
            };
        default:
            return state;
    }
}