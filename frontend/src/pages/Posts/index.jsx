import { useRef, useState } from 'react';
import { PostsContainer } from './styles'
import { useQuery } from 'react-query';

import InfiniteScroll from 'react-infinite-scroller';

import Post from '../../components/Post';

const Posts = () => {
    const containerRef = useRef(null);
    const [postsOffset, setPostsOffset] = useState(0);

    const { isLoading, isError, data: posts } = useQuery("posts", async () => {
        const response = await (await fetch(`http://localhost:8000/posts/`)).json()
        setPostsOffset(oldOffset => oldOffset + response.count);
        return response;
    });

    return (
        <PostsContainer ref={containerRef}>
            {posts && posts.results.map(({
                title, 
                content, 
                likes
            }) => (
                <Post 
                    title={title}
                    content={content.slice(0, 400)}
                    likes={likes}
                />
            ))}
        </PostsContainer>
    )
}

export default Posts;