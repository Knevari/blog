import { Container, Center } from '../../styles'

import { useQuery } from 'react-query';
import { formatDistance } from 'date-fns';
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

function fetchCurrentPost(id) {
    return async () => {
        const { data } = await axios.get(`${API_URL}posts/${id}/`)
        return data;
    }
}

function getAvgReadingTime(nWords) {
    const AVG_WORDS_PER_MIN = 250;
    return Math.floor(nWords / AVG_WORDS_PER_MIN);
}

function getNumberOfWords(text) {
    return text.split(' ').length;
}

const Post = ({ match: { params: {id} } }) => {
    const {isLoading, isError, data: post } = useQuery(
        "currentPost", 
        fetchCurrentPost(id), 
        { enabled: true }
    )

    return (
        <Container>
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
                <h1>Alguma coisa deu errado :)</h1>
            )}

            {post && (
                <PostContainer>
                    <Author>Postado por {post.author.username}</Author>
                    
                    <Title>{post.title}</Title>

                    <Meta>
                        <DateCreated>
                            {formatDistance(new Date(post.created_at), new Date(), { locale: ptBR })} atrás
                        </DateCreated>
                        <AverageReadingTime>
                            <ClockIcon icon={faClock} />&nbsp;
                            {getAvgReadingTime(getNumberOfWords(post.content))} mins
                        </AverageReadingTime>
                    </Meta>

                    <Content>{post.content}</Content>
                </PostContainer>
            )}
        </Container>
    )
}

export default Post