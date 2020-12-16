import { Container, Center } from '../../styles'

import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'

import { useToasts } from 'react-toast-notifications'

// Other Deps
import axios from 'axios';
import Loader from 'react-loader-spinner'

// Config stuff
import API_URL from '../../config'

import {
    PostContainer,
    InputTitle,
    InputContent,
    SelectTags,
    Save
} from './styles'

import { faClock } from '@fortawesome/free-solid-svg-icons'

const NewPost = () => {

    const token = useSelector(state => state.auth.user);
    console.log("Token", token)

    function fetchTags(id) {
        return async () => {
            const { data } = await axios.get(`${API_URL}tags/`)
            console.log(data)
            return data;
        }
    }

    async function newPost(post) {
        const headers = {
            Authorization: `Token ${token}`
        }
        let tags = [];
        post.tag.forEach(i => tags.push(JSON.parse(i)));
        post.tag = tags;
        console.log(tags);
        const { data } = await axios.post(`${API_URL}posts/`, { ...post, author: { id: 1, username: 'knevari', email: 'k@gmail.com' } }, { headers })
        return data;
    }



    const { isLoading, isError, data: tags } = useQuery(
        "tags",
        fetchTags(),
        { enabled: true }
    )

    const { register, handleSubmit } = useForm();
    const { addToast } = useToasts();

    const onSubmit = async data => {
        // dispatch(login(data.username, data.password))
        console.log("aqui")
        console.log(await newPost(data))
    };

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

            {tags && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PostContainer>
                        <label>Título da Postagem:</label>
                        <InputTitle ref={register} type="text" name="title" />
                        <label>Conteúdo:</label>
                        <InputContent ref={register} name="content" />
                        <label>Tags:</label>
                        <SelectTags ref={register} name="tag" multiple>
                            {tags.results.map(tag => (
                                <option
                                    key={tag.id}
                                    value={JSON.stringify(tag)}>
                                    {tag.title}
                                </option>
                            ))}
                        </SelectTags>
                        <Save type="submit">Salvar</Save>
                    </PostContainer>
                </form>
            )}
        </Container>
    )
}

export default NewPost