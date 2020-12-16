import { NavContainer, NavBrand, Center, NavItem } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import modalActions from '../../store/actions/modal'

// import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {

    const dispatch = useDispatch();

    function openModal(event){
        event.preventDefault();
        dispatch(modalActions.toggleModal(true))
    }

    return (
        <NavContainer>
            <Center>
                <NavBrand>Blogs</NavBrand>
                <div>
                    <NavItem to='/'>Sobre</NavItem>
                    <NavItem onClick={openModal} auth>Login</NavItem>
                    <NavItem to='/' auth>Registro</NavItem>
                </div>
            </Center>
        </NavContainer>)

}
export default NavBar;