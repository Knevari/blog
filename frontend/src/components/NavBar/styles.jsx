import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const NavContainer = styled.header`
    display: block;
    top: 0;
    left: 0;
    position: sticky;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    padding: 8px;
    background-color: #1e2328;
    z-index: 1;
    color: white;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);

    & > * {
        user-select: none;
    }
`;
export const NavBrand = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    
    cursor: pointer;
`;
export const Center = styled.div`
    width:  800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 8px 0;
`;

export const NavItems = styled.div`
    // border: 2px solid red;
`;

export const NavItem = styled(Link)`
    font-size: 0.9rem;
    padding: 6px;
    border-radius: 4px;
    color: white;
    outline: none;
    text-decoration: none;

    &:not(:last-child){
        margin-right: 8px;
    }

    background-color: ${props => props.authentication ? "#777" : "transparent"};

    ${props => !props.nohover && `
        &:hover{
            opacity: 0.9;
        }
    `}
`;

export const NavIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 1rem;
`;