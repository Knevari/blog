import { NavContainer, NavBrand, Center, NavItem, NavItems } from './styles'

import { logout } from '../../store/actions/auth'
import modalActions from '../../store/actions/modal'

import { useSelector, useDispatch } from 'react-redux'

import history from '../../utils/history'

const NavBar = () => {

    const dispatch = useDispatch();
    const userLoggedIn = useSelector(state => state.auth.loggedIn);

    function openModal(event){
        event.preventDefault();
        dispatch(modalActions.toggleModal(true))
    }

    function userLogout(){
        dispatch(logout());
    }
    
    function returnHome() {
        history.push("/")
    }

    return (
        <NavContainer>
            <Center>
                <NavBrand onClick={returnHome}>Blogs</NavBrand>
                <NavItems>
                    <NavItem to='/'>Sobre</NavItem>
                    {userLoggedIn ? 
                        <NavItem onClick={userLogout} authentication>Logout</NavItem> : 
                        <NavItem onClick={openModal} authentication>Login</NavItem>}
                </NavItems>
            </Center>
        </NavContainer>)

}
export default NavBar;