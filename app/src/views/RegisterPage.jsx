import React, { useState } from 'react'
import { Query } from 'react-apollo'
import Layout from '../layouts/Layout'
import Paper from '@material-ui/core/Paper'
import SignUpLocal from '../components/SignUpLocal'
import SignInLoal from '../components/SignInLoal'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import OAuth from '../components/OAuth'
import { GET_AUTH } from '../store'

export default function RegisterPage(props) {
  const [tab, setTab] = useState(0)

  function changeHandler(_, newValue) {
    setTab(newValue)
  }

  return (
    <Layout {...props}>
      <Query query={GET_AUTH}>
        {({ data }) => {
          if (data.isAuth) {
            props.history.push('/')
          } else {
            return (
              <Paper style={style.container}>
                <div style={style.local}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={tab}
                      onChange={changeHandler}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      scrollButtons="auto"
                    >
                      <Tab label="register" />
                      <Tab label="login" />
                    </Tabs>
                  </AppBar>
                  {tab === 0 && <SignUpLocal history={props.history} />}
                  {tab === 1 && <SignInLoal history={props.history} />}
                </div>
                <div style={style.outh}>
                  <OAuth history={props.history} />
                </div>
              </Paper>
            )
          }
          return <p>redirect</p>
        }}
      </Query>
    </Layout>
  )
}

const style = {
  container: {
    padding: '2rem',
    margin: '2rem',
    display: 'flex'
  },
  outh: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    margin: '1rem'
  },
  local: {
    flexGrow: 1
  }
}
