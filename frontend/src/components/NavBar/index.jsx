import { NavContainer, NavBrand, Center, NavItem, NavItems } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <NavContainer>
            <Center>
                <NavBrand>Blogs</NavBrand>
                <NavItems>
                    <NavItem to='/'>Sobre</NavItem>
                    <NavItem to='/' auth>Login</NavItem>
                    <NavItem to='/' auth>Registro</NavItem>
                </NavItems>
            </Center>
        </NavContainer>)

}
export default NavBar;