import { ApolloClient, InMemoryCache } from '@apollo/client';

export const ApolloClientConfig = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});
