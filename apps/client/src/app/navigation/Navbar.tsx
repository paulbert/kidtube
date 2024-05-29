import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';

const Navbar = () => {
  return (
    <>
      <Container maxW="container.xl">
        <Flex sx={{ alignItems: 'center' }}>
          <Heading
            sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", "Tahoma"' }}
          >
            kidtube
          </Heading>
          <Spacer />
          <ButtonGroup>
            <Button variant="ghost" as={ReactRouterLink} to="/parent/search">
              Parent Mode
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
      <Divider />
    </>
  );
};

export default Navbar;
