import { UPDATE_SEARCH } from '../reducers/search'

const searchActions = {
    updateSearch: (value) => ({
        type: UPDATE_SEARCH,
        value
    })
}
export default searchActions;