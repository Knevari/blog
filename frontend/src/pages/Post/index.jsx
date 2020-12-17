import { Container, Center } from '../../styles'

import { useQuery } from 'react-query';
import { formatDistance, subMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale'

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
import CommentEditor from '../../components/CommentEditor'

function fetchCurrentPost(id) {
    return async () => {
        const { data } = await axios.get(`${API_URL}posts/${id}/`)
        return data;
    }
}

function getAvgReadingTime(content) {
    const nWords = content.split(' ').length;

    const AVG_WORDS_PER_MIN = 250;
    const mins = Math.floor(nWords / AVG_WORDS_PER_MIN);

    const now = new Date();

    return formatDistance(subMinutes(now, mins), now, {
        locale: ptBR
    });
}

function getElapsedTime(time) {
    return formatDistance(new Date(time), new Date(), {
        locale: ptBR
    })
}

const Post = ({ match: { params: {id} } }) => {
    const {isLoading, isError, data: post } = useQuery(
        "currentPost", 
        fetchCurrentPost(id), 
        {
            enabled: true,
            cacheTime: 0,
        }
    )

    return (
        <Container>
            <ScrollToTop />
            {isLoading && (
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

            {isError && (
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

                    <CommentEditor />
                </PostContainer>
            )}
        </Container>
    )
}

export default Post