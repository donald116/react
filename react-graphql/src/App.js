import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import Evenements from './composants/Evenements'

const httpLink = new createHttpLink({
	uri: 'https://staging-graphql-service.onrewind.tv',
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(
      headers || {},
      {
		'x-account-key': 'ryHvne_jFV'
      }
    )
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


const App = () => (
	<ApolloProvider client={client}>
		<Evenements/>
	</ApolloProvider>
)
export default App;
