import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Search from './search/Search';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

export function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<Search />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
