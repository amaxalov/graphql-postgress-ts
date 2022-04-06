import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { render } from 'react-dom'
import { GlobalStyles } from './styles/global'
import { Main } from './features/hogwarts/organisms/main'

const client = new ApolloClient({
  uri: 'http://localhost:3300/graphql',
  cache: new InMemoryCache(),
})

export const Root: React.FC = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Main />
    </ApolloProvider>
  </React.StrictMode>
)

render(<Root />, document.getElementById('root'))
