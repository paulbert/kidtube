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
import Group from './library/Group';

// exported for testing
export function BaseApp() {
  return (
    <ChakraProvider>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Navbar />
        <Container maxW="container.lg" my={4}>
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/group/:groupId" element={<Group />} />
            <Route path="/video/:id" element={<VideoViewer />} />

            {/* PARENT ROUTES */}
            <Route path="/parent/search" element={<Search />} />
            <Route path="/parent/library" element={<Library />} />
            <Route
              path="/parent/library/group/:groupId"
              element={<Group isParentMode />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export function App() {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/graphql'
        : '/graphql',
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
