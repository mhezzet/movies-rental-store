import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import defaults from './defaults'
export * from './actions'

export const client = new ApolloClient({
  uri: 'localhost:3000/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
})

export default function Apollo({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
