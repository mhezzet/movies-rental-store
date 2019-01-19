import React from 'react'
import { LOGIN_LOCAL, SET_AUTH } from '../store'
import { Mutation } from 'react-apollo'
import RegisterForm from './RegisterForm'

export default function SignInLoal({ history }) {
  return (
    <Mutation mutation={LOGIN_LOCAL}>
      {(loginLocal, { error, loading, client }) => {
        return (
          <RegisterForm
            type="login"
            isloading={loading}
            serverError={error && error.graphQLErrors[0].message}
            submitHandler={variables => {
              loginLocal({ variables }).then(({ data }) => {
                client.mutate({
                  mutation: SET_AUTH,
                  variables: { ...data.loginLocal }
                })
                history.push('/')
              })
            }}
          />
        )
      }}
    </Mutation>
  )
}
