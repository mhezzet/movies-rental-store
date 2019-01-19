import React from 'react'
import { Mutation } from 'react-apollo'
import FaceBook from 'react-facebook-login'
import Google from 'react-google-login'
import { REGISTER_FACEBOOK, SET_AUTH, REGISTER_GOOGLE } from '../store'

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default function OAuth({ history }) {
  return (
    <div style={style.container}>
      <Mutation mutation={REGISTER_FACEBOOK}>
        {(registerFaceBook, { client }) => (
          <FaceBook
            className="OauthFaceBook"
            appId="1110178902497821"
            icon="fa-facebook"
            fields="email,picture"
            callback={response =>
              registerFaceBook({
                variables: { authToken: response.accessToken }
              }).then(({ data }) => {
                client.mutate({
                  mutation: SET_AUTH,
                  variables: { ...data.registerFaceBook }
                })
                history.push('/')
              })
            }
          />
        )}
      </Mutation>
      <Mutation mutation={REGISTER_GOOGLE}>
        {(registerGoogke, { client }) => (
          <Google
            className="OauthGoogle"
            clientId="206287665550-ar9bia38bnlpqf72paels7lrfa3p2q2q.apps.googleusercontent.com"
            onSuccess={response => {
              console.log(response)
              registerGoogke({
                variables: { authToken: response.accessToken }
              }).then(({ data }) => {
                client.mutate({
                  mutation: SET_AUTH,
                  variables: { ...data.registerGoogle }
                })
                history.push('/')
              })
            }}
          />
        )}
      </Mutation>
    </div>
  )
}
