import { Route, Switch, Router } from 'react-router-dom';

import history from '../utils/history'

// Components
import NavBar from '../components/NavBar'

// Pages
import Post from './Post';
import Posts from './Posts';
import NewPost from './NewPost'

const Pages = () => {

    return (
        <Router history={history}>
            <NavBar />
            <Switch>
                <Route exact path="/" exact strict component={Posts}/>
                <Route exact path="/new_post" component={NewPost}/>
                <Route path="/post/:id" component={Post} />
            </Switch>
        </Router>
    )
}

export default Pages