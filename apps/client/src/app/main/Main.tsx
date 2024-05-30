import { gql, useQuery } from '@apollo/client';

import { Card, CardBody, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { GetMainPageGroupsQuery } from '../../gql/graphql';

export const getMainPageGroupsQuery = gql`
  query GetMainPageGroups {
    getAllGroups {
      id
      name
      thumbnailUrl
    }
  }
`;

const Main = () => {
  const { data } = useQuery<GetMainPageGroupsQuery>(getMainPageGroupsQuery);

  const groups = data?.getAllGroups || [];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {groups.map(({ id, thumbnailUrl, name }) => (
        <GridItem key={id}>
          <Card boxShadow="none">
            <CardBody>
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

export default Main;
