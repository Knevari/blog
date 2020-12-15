import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PostsContainer } from './styles'
import { useQuery } from 'react-query'
import axios from 'axios';

// import InfiniteScroll from 'react-infinite-scroller';

import Post from '../../components/Post'
import SearchBar from '../../components/SearchBar'
import LoginModal from '../../components/LoginModal'

const Posts = () => {
    const containerRef = useRef(null);
    const URL = 'http://localhost:8000/posts/'

    const searchValue = useSelector(state => state.search.searchValue);

    const { isLoading, isError, data: posts, refetch } = useQuery("posts", async () => {
        const { data } = await axios.get(URL + `?search=${searchValue}`)
        return data
    }, { enabled: false, });


    useEffect(refetch, [searchValue])


    return (
        <PostsContainer ref={containerRef}>
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
                        key={id}
                        title={title}
                        username={username}
                        content={content.slice(0, 400)}
                        likes={likes}
                    />
                ))}
        </PostsContainer>
    )
}

export default Posts;