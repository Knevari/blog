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

const NewPost = () => {
    const user = useSelector(state => state.auth.user);
    const { register, handleSubmit, reset } = useForm();
    const { addToast } = useToasts();

    function fetchTags(id) {
        return async () => {
            const { data } = await axios.get(`${API_URL}tags/`)
            return data;
        }
    }

    function newPost(post) {
        const headers = {
            Authorization: `Token ${user.token}`
        }
        axios.post(`${API_URL}posts/`, { ...post }, { headers })
            .then(data => {
                addToast(`Post cadastrado com sucesso!`, { appearance: 'success' });
                reset({})
                return data;
            })
            .catch(error => {
                console.log(error.response);
                const error_messages = error.response.data
                for (let err in error_messages) {
                    let message = error_messages[err]
                    if (Array.isArray(message)) message = message.join("\n")
                    addToast(`${err}: ${message}`, { appearance: 'error' });
                }
                return error_messages;
            })
    }

    const { isLoading, isError, data: tags } = useQuery(
        "tags",
        fetchTags(),
        { enabled: true }
    )

    const onSubmit = async data => newPost(data)


    return (
        <Container>
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
                                    value={tag.id}>
                                    {tag.title}
                                </option>
                            ))}
                        </SelectTags>
                        <Save type="submit" ref={register} setT>Salvar</Save>
                    </PostContainer>
                </form>
            )}
        </Container>
    )
}

export default NewPost