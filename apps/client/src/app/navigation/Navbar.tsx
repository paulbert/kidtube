import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';

const ParentButtons = () => (
  <>
    <Button variant="ghost" as={ReactRouterLink} to="/parent/search">
      Search
    </Button>
    <Button variant="ghost" as={ReactRouterLink} to="/parent/library">
      Library
    </Button>
    <Spacer />
    <ButtonGroup>
      <Button variant="ghost" as={ReactRouterLink} to="/">
        Kid Mode
      </Button>
    </ButtonGroup>
  </>
);

const KidButtons = () => (
  <ButtonGroup>
    <Button variant="ghost" as={ReactRouterLink} to="/parent/search">
      Parent Mode
    </Button>
  </ButtonGroup>
);

const Navbar = () => {
  const location = useLocation();
  const isParentMode = location.pathname.startsWith('/parent');

  return (
    <>
      <Container maxW="container.xl">
        <Flex sx={{ alignItems: 'center' }}>
          <Heading
            sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", "Tahoma"' }}
            as={ReactRouterLink}
            to={isParentMode ? '/parent/search' : '/'}
          >
            kidtube
          </Heading>
          <Spacer />
          {isParentMode ? <ParentButtons /> : <KidButtons />}
        </Flex>
      </Container>
      <Divider />
    </>
  );
};

export default Navbar;
