import { Route, BrowserRouter } from 'react-router-dom';

import Posts from './Posts'
import NavBar from '../components/NavBar'

const Pages = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Route to="/" component={Posts} />
        </BrowserRouter>
    )
}

export default Pages