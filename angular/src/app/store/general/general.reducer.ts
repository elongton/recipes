import * as GeneralActions from './general.actions';

export type State = {
    tagCategories: any,
    storeSections: any,
    loading: Boolean,
}

const initialState = {
    tagCategories: [],
    storeSections: [],
    loading: false,

}

export function generalReducer(state = initialState, action: GeneralActions.GeneralActions) {
    switch (action.type) {

        case GeneralActions.BEGIN_RETRIEVE_REFDATA:
            return {
                ...state,
                loading: true,
            }
        case GeneralActions.SUCCESS_RETRIEVE_REFDATA:
            return {
                ...state,
                tagCategories: get('tag_category', [...action.payload]),
                loading: false,
            }
        case GeneralActions.BEGIN_RETRIEVE_STORE_SECTIONS:
            return {
                ...state,
                loading: true,
            }
        case GeneralActions.SUCCESS_RETRIEVE_STORE_SECTIONS:
            return {
                ...state,
                storeSections: [...action.payload],
                loading: false,
            }

        default:
            return state;

    }

}

function get(fieldName: string, refData: any) {
    let filteredData = []
    let refObject = {}
    try {
        filteredData = refData.filter(item => item['reference_type'] === fieldName)
        filteredData.forEach(row => {
            refObject[row.key] = row.value
        })
    } catch (e) {
        console.error(e)
    }
    return { refObject: refObject, refArray: filteredData }
}