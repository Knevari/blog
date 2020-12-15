import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #000000;
        font-family: 'IBM Plex Sans', sans-serif;
        
        & > * {
            box-sizing: border-box;
        }
    }
`;

export default GlobalStyle;