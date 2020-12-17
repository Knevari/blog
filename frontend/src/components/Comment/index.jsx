import {
    CommentContainer,
    CommentAuthor,
    CommentContent
} from './styles'

import { getElapsedTime } from '../../utils/time'

const  Comment = ({ content, author, created_at }) => {
    return (
        <CommentContainer>
            <CommentAuthor>{author}, {getElapsedTime(created_at)} atrás</CommentAuthor>
            <CommentContent>{content}</CommentContent>
        </CommentContainer>
    )
}

export default Comment