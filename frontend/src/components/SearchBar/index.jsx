import { SearchContainer, SearchInput, SearchButton } from './styles'
import { useDispatch } from 'react-redux'
import searchActions from '../../store/actions/search'
import debounce from '../../utils/debounce'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
    const dispatch = useDispatch()

    const debounceChangeValue = debounce(changeValue, 500)

    function changeValue(event) {
        event.preventDefault();
        dispatch(searchActions.updateSearch(event.target.value))
    }

    return (
        <SearchContainer>
            <SearchButton icon={faSearch} />
            <SearchInput
                type="text"
                onChange={debounceChangeValue}
                placeholder="Search...."
            />
        </SearchContainer>)
}

export default SearchBar;