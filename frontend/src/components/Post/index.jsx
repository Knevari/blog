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
} from './styles'

import { faComments, faThumbsUp } from '@fortawesome/free-solid-svg-icons'


const Post = ({ title, content, likes, username, onClick }) => (
    <PostContainer onClick={onClick}>
        <PostOwner>Postado por {username}</PostOwner>
        <OverlayContainer>
            <PostTitle>{title}</PostTitle>
            <PostTags>Tag</PostTags>
            <PostContent>{content}</PostContent>
            <Overlay />
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