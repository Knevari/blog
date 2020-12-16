import styled from 'styled-components'

export const PostContainer = styled.div`
    margin-top: 12px;
    
    & > * {
        color: #f5f5f5;
    }
`;

export const Title = styled.h2`
    font-size: 2em;
    font-family: Open Sans, sans-seriff;
    margin: 0;
    padding: 0;
`;

export const Author = styled.span`
    color: #999999;
`;

export const Meta = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 24px;
    font-family: Open Sans;
`;

export const DateCreated = styled.span`
    margin-right: 12px;
`;

export const AverageReadingTime = styled.span`
`;

export const Content = styled.div`
    font-size: 1.2rem;
    text-align: justify;
    font-weight: 500;
`;
