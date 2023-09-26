import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'

import Search from './search/search';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

export function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Search />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
