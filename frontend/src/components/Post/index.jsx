import {
    PostContainer,
    PostOwner,
    PostTitle,
    PostContent,
    PostActions,
    Overlay,
    OverlayContainer,
    Action,
    ActionTitle,
    ActionButton,
    PostTags,
    TagsContainer,
} from './styles'

import { faComments, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'

const Post = ({ title, content, likes, username, onClick }) => (
    <PostContainer onClick={onClick}>
        <PostOwner>Postado por {username}</PostOwner>
        <OverlayContainer>
            <PostTitle>{title}</PostTitle>
            <TagsContainer>
                <PostTags color="#888">Esta é uma tag</PostTags>
                <PostTags color="#888">Outra tag</PostTags>
            </TagsContainer>
            <PostContent>{content}</PostContent>
            {content.length > 300 ? <Overlay /> : null}
        </OverlayContainer>
        <PostActions>
            <Action>
                <ActionButton icon={faThumbsUp} />
                <ActionTitle>{likes} Curtidas</ActionTitle>
            </Action>
            <Action>
                <ActionButton icon={faComments} />
                <ActionTitle>0 Comentários</ActionTitle>
            </Action>
        </PostActions>
    </PostContainer>
)

export default Post;