import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PostContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin: 12px 0;
    padding: 8px;
    border: 1px solid rgba(66, 66, 66, 0.4);
    border-radius: 4px;
    background-color: #1e2328;
    cursor: pointer;
    position: relative;
    font-weight: 300;
    overflow: none;
    word-wrap: break-word;

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.4);   
    }
`;


export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent 70%, #1e2328 100%);
`;

export const OverlayContainer = styled.div`
    position: relative;
`;

export const PostOwner = styled.div`
    font-size: 0.8rem;
    color: #999;
    margin-bottom: 4px;
`;

export const PostTitle = styled.div`
    color: white;
    font-size: 1.3rem;
    margin-bottom: 8px;
    font-weight: 400;
`;

export const PostContent = styled.div`
    color: white;
    font-size: 1.2rem;
`;

export const PostActions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: 1
    flex-wrap: wrap;
    margin: 12px 0 0 0;
`;

export const Action = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 8px;
    padding: 4px;
    border-radius: 4px;

    &:hover {
        background-color: rgba(66, 66, 66, 0.6);
    }
`;

export const ActionTitle = styled.span`
    font-size: 0.8rem;
    color: #888;
`;

export const ActionButton = styled(FontAwesomeIcon)`
    color: #888;
    font-size: 1rem;
    margin-right: 4px;
`;

export const PostTags = styled.div`
    font-size: 1rem;
    color: white;
    margin-bottom: 4px;
    
`;