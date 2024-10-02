import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
  } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {QueryClient} from '@tanstack/react-query';

import {setContext} from '@apollo/client/link/context';

import {CONSTANTS} from './constants';
import { logging } from './loggin';


/**
 * Creates and returns an Apollo Client instance configured with authentication, error handling, and HTTP link.
 *
 * @param token - The authentication token to be included in the request headers.
 * @returns An instance of ApolloClient configured with the provided token, error handling, and HTTP link.
 *
 * @remarks
 * - The `authLink` adds the provided token to the request headers for authentication.
 * - The `errorLink` handles GraphQL and network errors, logging unauthorized errors and network issues.
 * - The `httpLink` specifies the GraphQL server URI.
 * - The links are concatenated to form a single link chain used by the Apollo Client.
 */
export const getApolloClient = (token: string) => {

    const httpLink = createHttpLink({
        uri: CONSTANTS.GRAPHQL_URL,
      });
    
      const authLink = setContext((_: any, { headers }: any) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });
    
      const errorLink = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            // We need to ts ignore here because the api dont implement the extension of errors.
            //@ts-ignore
            switch (err.code) {
              case 401:
                // TODO: implement a logou action in redux to clear the token and user state
                // dispatch(logout());
                logging.error('Unauthorized');
                break;
            }
          }
        }
    
        if (networkError) {
            logging.error(`[Network error]: ${networkError}`);
        }
      });
    
      const getErrorLink = authLink.concat(errorLink);
      const link = getErrorLink.concat(httpLink);

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
      });


    return client;
}

/**
 * Creates and returns a new instance of QueryClient with default options.
 *
 * @returns A new instance of QueryClient with default options.
 *
 * @remarks
 * - The default options include a stale time of 5 minutes for queries.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5000, // 5min
    },
  },
});

export {queryClient};
