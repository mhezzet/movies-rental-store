import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import defaults from './defaults'
export * from './actions'

export const client = new ApolloClient({
  uri: 'http://localhost:3000',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  clientState: {
    resolvers,
    typeDefs,
    defaults
  }
})

export default function Apollo({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
