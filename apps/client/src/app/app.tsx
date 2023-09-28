import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'

import Search from './search/Search';

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
