import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: inherit;
    }

    /* Body styles */
    body {
        font-family: Lato, sans-serif;
        color: #333333;
        background-color: #F5F5F5;
    }

    /* Font styles */
    h1,
    h2,
    h3 {
        font-family: Roboto Bold, sans-serif;
        font-weight: bold;
    }

    p {
        line-height: 1.5;
    }

    a {
        color: #007AFF;
        text-decoration: none;
        transition: color 0.2s ease-in-out;
    }

    a:hover,
    a:active {
        color: #E5E5E5;
    }

    /* Accent styles */
    .accent {
        color: #007AFF;
        font-family: Playfair Display, serif;
    }

    /* Additional styles you might need */
    /* ... */
`;

export default GlobalStyle;
