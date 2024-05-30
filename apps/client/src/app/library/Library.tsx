import { gql, useQuery } from '@apollo/client';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Card, CardBody, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { GetLibraryPageGroupsQuery } from '../../gql/graphql';

export const getLibraryPageGroupsQuery = gql`
  query GetLibraryPageGroups {
    getAllGroups {
      id
      name
      thumbnailUrl
    }
  }
`;

const Library = () => {
  const { data } = useQuery<GetLibraryPageGroupsQuery>(
    getLibraryPageGroupsQuery
  );

  const groups = data?.getAllGroups || [];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {groups.map(({ id, thumbnailUrl, name }) => (
        <GridItem key={id}>
          <Card boxShadow="none">
            <CardBody as={ReactRouterLink} to={`/group/${id}`}>
              {thumbnailUrl ? (
                <Image src={thumbnailUrl} borderRadius="lg" alt={name} />
              ) : (
                <Text>{name}</Text>
              )}
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Library;
