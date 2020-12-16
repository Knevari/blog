import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #000000;
        font-family: 'IBM Plex Sans', sans-serif;
        overflow-x: hidden;

        & > * {
            box-sizing: border-box;
        }
    }
`;

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;
`;

export const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 48px 0;
`;

export default GlobalStyle;