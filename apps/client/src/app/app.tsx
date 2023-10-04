import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Search from './search/Search';

const isTest = process.env.NODE_ENV === 'test';
const client = isTest ? null : new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

// exported for testing
export function BaseApp() {
  return (
    <ChakraProvider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export function App() {
  return client ? (
    <ApolloProvider client={client}>
      <BaseApp />
    </ApolloProvider>
  // TODO: Throw error component instead of rendering app without apollo
  ) : <BaseApp />;
}

export default App;
