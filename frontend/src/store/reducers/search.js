const initialState = {
    searchValue: ""
}

export const UPDATE_SEARCH = "UPDATE_SEARCH"

export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case UPDATE_SEARCH: {
            return { searchValue: action.value }
        }
        default:
            return state
    }

}