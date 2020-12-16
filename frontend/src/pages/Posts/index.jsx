import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { Container} from '../../styles'
import axios from 'axios';

// import InfiniteScroll from 'react-infinite-scroller';

import Post from '../../components/Post'
import SearchBar from '../../components/SearchBar'
import LoginModal from '../../components/LoginModal'

const Posts = ({ history }) => {
    const containerRef = useRef(null);
    const URL = 'http://localhost:8000/posts/'

    const searchValue = useSelector(state => state.search.searchValue);

    const { isLoading, isError, data: posts, refetch } = useQuery("posts", async () => {
        const { data } = await axios.get(URL + `?search=${searchValue}`)
        return data
    }, { enabled: false, });


    useEffect(refetch, [searchValue])

    const goToPost = id => {
        history.push(`/post/${id}`)
    }

    return (
        <Container ref={containerRef}>
            <LoginModal />
            <SearchBar />
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