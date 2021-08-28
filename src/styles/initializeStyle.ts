import { css } from 'styled-components';

const initializeStyle = css`
  * {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: var(--text);
    font-family: var(--regular);
    font-size: 1rem;
  }

  #__next {
    height: 100%;
  }

  #layoutRoot {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
    justify-items: center;
    min-height: 100%;
  }

  h1 {
    margin-bottom: 1.25rem;
    font-size: 2rem;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 1.5rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.125rem;
    font-size: 1.25rem;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.125rem;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1.pageHeading {
    margin-bottom: 3rem;
    color: var(--primary);
  }

  form {
    button {
      margin: 2rem 1rem 3rem 0;
      border: none;
      border-radius: 0.5rem;
      background: var(--secondary);
      padding: 0 1rem;
      width: auto;
      min-width: 9rem;
      height: 2.6rem;
      color: var(--primary);
      color: var(--primary);
      font-family: var(--accent);
      font-size: 1rem;
      font-weight: 700;
    }
    button:first-of-type {
      background: var(--primary);
      color: #ffffff;
    }
    button:hover,
    button:focus {
      cursor: pointer;
    }
  }
`;

export default initializeStyle;
