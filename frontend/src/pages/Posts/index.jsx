import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { Center, Container} from '../../styles'
import axios from 'axios';

// import InfiniteScroll from 'react-infinite-scroller';

import Post from '../../components/Post'
import SearchBar from '../../components/SearchBar'
import LoginModal from '../../components/LoginModal'
import Loader from 'react-loader-spinner';

const Posts = ({ history }) => {
    const containerRef = useRef(null);
    const URL = 'http://localhost:8000/posts/'

    const searchValue = useSelector(state => state.search.searchValue);

    const { isLoading, isError, data: posts, refetch } = useQuery("posts", async () => {
        const { data } = await axios.get(URL + `?search=${searchValue}`)
        return data
    }, { enabled: false, });


    useEffect(refetch, [searchValue, refetch])

    const goToPost = id => {
        history.push(`/post/${id}`)
    }

    return (
        <Container ref={containerRef}>
            <LoginModal />
            <SearchBar />

            {isLoading && (
                <Center>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000}    
                    />
                </Center>
            )}

            {isError && (
                <h1 style={{color: "white"}}>Alguma coisa deu errado, lide com isso</h1>
            )}

            {posts && posts.results.map(({
                id,
                title,
                author: { username },
                content,
                likes
            }) => (
                    <Post
                        onClick={() => goToPost(id)}
                        key={id}
                        title={title}
                        username={username}
                        content={content.slice(0, 400)}
                        likes={likes}
                    />
                ))}
        </Container>
    )
}

export default Posts;