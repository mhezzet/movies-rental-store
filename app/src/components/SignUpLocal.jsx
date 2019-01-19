import React from 'react'
import { Mutation } from 'react-apollo'
import { REGISTER_LOCAL, SET_AUTH } from '../store'
import RegisterForm from './RegisterForm'

export default function SignUpLocal({ history }) {
  return (
    <Mutation mutation={REGISTER_LOCAL}>
      {(registerLocal, { error, loading, client }) => {
        return (
          <RegisterForm
            type="register"
            isloading={loading}
            serverError={error && error.graphQLErrors[0].message}
            submitHandler={variables => {
              registerLocal({ variables }).then(({ data }) => {
                client.mutate({
                  mutation: SET_AUTH,
                  variables: { ...data.registerLocal }
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
