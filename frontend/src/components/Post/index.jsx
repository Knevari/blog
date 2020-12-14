import {
    PostContainer,
    PostTitle,
    PostContent,
    PostActions,
    Overlay,
    OverlayContainer,
    Action,
    ActionTitle,
    ActionButton,
} from './styles'

import { faComments, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Post = ({ title, content, likes }) => (
    <PostContainer>
        {/*<PostOwner>{owner}</PostOwner>*/}
        <OverlayContainer>
            <PostTitle>{title}</PostTitle>
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