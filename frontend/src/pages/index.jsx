import { Route, BrowserRouter } from 'react-router-dom';

import Posts from './Posts'

const Pages = () => {
    return (
        <BrowserRouter>
            <Route to="/" component={Posts} />
        </BrowserRouter>
    )
}

export default Pages