import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Mutation, Query } from 'react-apollo'
import { RESET_AUTH, GET_AUTH } from '../store'

const style = {
  logo: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}

export default function Header(props) {
  return (
    <Query query={GET_AUTH}>
      {({ data }) => (
        <AppBar position="static">
          {console.log(data)}
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              style={style.logo}
              onClick={() => props.history.push('/')}
            >
              Movies Rental Store
            </Typography>
            {!data.isAuth && (
              <>
                <Button
                  onClick={() => props.history.push('/register')}
                  color="inherit"
                >
                  register
                </Button>
                <Button
                  onClick={() => props.history.push('/register')}
                  color="inherit"
                >
                  Login
                </Button>
              </>
            )}

            {data.isAuth && (
              <Mutation mutation={RESET_AUTH}>
                {logout => (
                  <Button onClick={logout} color="inherit">
                    logout
                  </Button>
                )}
              </Mutation>
            )}
          </Toolbar>
        </AppBar>
      )}
    </Query>
  )
}
