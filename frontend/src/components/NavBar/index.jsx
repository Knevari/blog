import {
    NavContainer,
    NavBrand,
    Center,
    NavIcon,
    NavItem,
    NavItems
} from './styles'

import { logout } from '../../store/actions/auth'
import modalActions from '../../store/actions/modal'

import { useSelector, useDispatch } from 'react-redux'

import history from '../../utils/history'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {

    const dispatch = useDispatch();
    const {loggedIn: userLoggedIn, user: {username}} = useSelector(state => state.auth);

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
    function newPost() {
        history.push("/new_post")
    }

    return (
        <NavContainer>
            <Center>
                <NavBrand onClick={returnHome}>Blogs</NavBrand>
                <NavItems>
                    {userLoggedIn && (
                        <>
                            <NavItem onClick={newPost}>
                                <NavIcon icon={faEdit} />&nbsp;
                                <span>Novo Post</span>
                            </NavItem>
                            <NavItem nohover>
                                <span>Oi, {username}</span>
                            </NavItem>
                        </>
                    )}
                    {userLoggedIn ? 
                        <NavItem onClick={userLogout} authentication>Logout</NavItem> : 
                        <NavItem onClick={openModal} authentication>Login</NavItem>}
                </NavItems>
            </Center>
        </NavContainer>)

}
export default NavBar;