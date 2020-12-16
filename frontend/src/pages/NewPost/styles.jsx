import styled from 'styled-components'
import { SubmitButton } from '../../components/LoginModal/styles'

export const PostContainer = styled.div`
    margin-top: 24px;
    
    & > * {
        color: #f5f5f5;
        width: 100%;
    }
    label{
        display: block;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    input, textarea, select{
        font-size: 1.1rem;
        padding: 4px;
        appearance: none;
        border: 1px solid #777;
        border-radius: 4px;
        box-sizing: border-box;
        outline: none;
        color: white;
        background-color: #888;
    }
`;

export const InputTitle = styled.input``;

export const InputContent = styled.textarea`
    resize: none;
    height: 250px;
`;

export const SelectTags = styled.select``;

export const Save = styled(SubmitButton)`
    background-color: #777;
    color: black;
`;