import { Route, Router } from 'react-router-dom';

import history from '../utils/history'
import Posts from './Posts'
import NavBar from '../components/NavBar'

const Pages = () => {
    return (
        <Router history = {history}>
            <NavBar />
            <Route to="/" component={Posts}/>
        </Router>
    )
}

export default Pages