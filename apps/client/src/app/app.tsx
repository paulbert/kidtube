import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from '@apollo/client';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Search from './search/Search';
import Navbar from './navigation/Navbar';
import Library from './library/Library';
import Seasons from './library/Seasons';
import VideoViewer from './video/VideoViewer';

// exported for testing
export function BaseApp() {
  return (
    <ChakraProvider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Navbar />
        <Container maxW="container.lg" my={4}>
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/parent/search" element={<Search />} />
            <Route path="/group/:groupId" element={<Seasons />} />
            <Route path="/video/:id" element={<VideoViewer />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export function App() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
  });
  const removeTypenameLink = removeTypenameFromVariables();
  const link = from([removeTypenameLink, httpLink]);

  const isTest = process.env.NODE_ENV === 'test';
  const client = isTest
    ? null
    : new ApolloClient({
        cache: new InMemoryCache(),
        link,
      });
  return client ? (
    <ApolloProvider client={client}>
      <BaseApp />
    </ApolloProvider>
  ) : (
    // TODO: Throw error component instead of rendering app without apollo
    <BaseApp />
  );
}

export default App;
