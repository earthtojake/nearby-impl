import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const Client = () => {
  const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>);
}

AppRegistry.registerComponent('Reach', () => Client);
