import { Container, Center } from '../../styles'

import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'

// Other Deps
import axios from 'axios';
import Loader from 'react-loader-spinner'

// Config stuff
import API_URL from '../../config'

import {
    PostContainer,
    Title,
    Author,
    Meta,
    DateCreated,
    AverageReadingTime,
    Content,
    ClockIcon
} from './styles'

import { faClock } from '@fortawesome/free-solid-svg-icons'

import ScrollToTop from '../../components/ScrollToTop'
import Comment from '../../components/Comment'
import CommentEditor from '../../components/CommentEditor'

import { getAvgReadingTime, getElapsedTime } from '../../utils/time'

function fetchCurrentPost(id) {
    return async () => {
        const { data } = await axios.get(`${API_URL}posts/${id}/`)
        return data
    }
}

function fetchCurrentPostComments(id) {
    return async () => {
        const { data } = await axios.get(`${API_URL}posts/${id}/comments/`)
        return data
    }
}

const Post = ({ match: { params: {id} } }) => {
    const {isLoading: isPostLoading, isError: postHasErrored, data: post } = useQuery(
        "currentPost", 
        fetchCurrentPost(id), 
        {
            enabled: true,
            cacheTime: 0,
        }
    )

    const  {isLoading: areCommentsLoading, isError: commentsHaveErrored, data: comments } = useQuery(
        "currentPostComments", 
        fetchCurrentPostComments(id), 
        {
            enabled: true,
            cacheTime: 0,
        }
    )


    const loggedIn = useSelector(state => state.auth.loggedIn)

    return (
        <Container>
            <ScrollToTop />
            {isPostLoading && (
                <Center>
                    <Loader
                        type="Puff"
                        color="#888888"
                        height={100}
                        width={100}
                        timeout={3000}    
                    />
                </Center>
            )}

            {postHasErrored && (
                <h1>Alguma coisa deu errado :)</h1>
            )}

            {post && (
                <PostContainer>
                    <Author>Postado por {post.author.username}</Author>
                    
                    <Title>{post.title}</Title>

                    <Meta>
                        <DateCreated>
                            {getElapsedTime(post.created_at)} atrás
                        </DateCreated>
                        <AverageReadingTime>
                            <ClockIcon icon={faClock} />&nbsp;
                            {getAvgReadingTime(post.content)} de leitura
                        </AverageReadingTime>
                    </Meta>

                    <Content dangerouslySetInnerHTML={{__html: post.content}} />

                    {loggedIn && <CommentEditor />}

                    {comments && comments.map(comment => (
                        <Comment
                            author={comment.author.username}
                            created_at={comment.created_at} 
                            content={comment.content}
                        />
                        
                    ))}
                </PostContainer>
            )}

        </Container>
    )
}

export default Post