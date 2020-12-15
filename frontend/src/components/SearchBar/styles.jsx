import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 40px;
    padding: 8px;
    background-color: #1e2328;
    border-radius: 6px;
    margin-top: 12px;
    /* border: 1px solid rgba(66, 66, 66, 0.4);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    font-weight: 300;*/

    &:hover {
        border: 1px solid white;
        background-color: #222222;

    } 
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    font-size: 1.2em;
    color: white;
    /* appearance: none; */
    background-color: transparent;

    &::placeholder{
        color: white;
    }

`;
export const SearchButton = styled(FontAwesomeIcon)`
    color: #888;
    font-size: 1rem;
    margin-right: 4px;
    height: 100%;
    /* min-width: 20px; */
    padding-left: 8px;
    padding-right: 8px;
    /* background-color: red; */
`;