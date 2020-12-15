import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const NavContainer = styled.header`
    display: block;
    top: 0;
    position: sticky;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #1e2328;
    z-index: 1;
    color: white;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);

`;
export const NavBrand = styled.div`
    font-size: 1.2em;

`;
export const Center = styled.div`
    width:  800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 8px;
    /* border: solid 2px black; */
`;
export const NavItem = styled(Link)`
    font-size: 0.9rem;
    padding: 8px;
    border-radius: 8px;
    color: white;
    outline: none;
    text-decoration: none;

    &:not(:last-child){
        margin-right: 8px;
    }
    border: ${props => props.auth ? "solid 1px white" : "none"};

    &:hover{
        opacity: 0.8;
        text-decoration: underline;
    }
`;