import { NavContainer, NavBrand, Center, NavItem } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <NavContainer>
            <Center>
                <NavBrand>Blogs</NavBrand>
                <div>
                    <NavItem to='/'>Sobre</NavItem>
                    <NavItem to='/' auth>Login</NavItem>
                    <NavItem to='/' auth>Registro</NavItem>
                </div>
            </Center>
        </NavContainer>)

}
export default NavBar;