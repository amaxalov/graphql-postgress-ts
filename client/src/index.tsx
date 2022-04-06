import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Main } from './features/hogwarts/organisms/main'

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export const Root: React.FC = () => (
  <React.StrictMode>
    <GlobalStyles />
    <Main />
  </React.StrictMode>
)

render(<Root />, document.getElementById('root'))
