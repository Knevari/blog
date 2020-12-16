import { NavContainer, NavBrand, Center, NavItem, NavItems } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import modalActions from '../../store/actions/modal'
import { logout } from '../../store/actions/auth'

// import { faSearch } from '@fortawesome/free-solid-svg-icons'

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
    
    return (
        <NavContainer>
            <Center>
                <NavBrand>Blogs</NavBrand>
                <NavItems>
                    <NavItem to='/'>Sobre</NavItem>
                    {userLoggedIn ? <NavItem onClick={userLogout} auth>Logout</NavItem> : <NavItem onClick={openModal} auth>Login</NavItem>}
                    {/* <NavItem to='/' auth>Registro</NavItem> */}
                </NavItems>
            </Center>
        </NavContainer>)

}
export default NavBar;