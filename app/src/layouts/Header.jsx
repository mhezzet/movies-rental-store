import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { RESET_AUTH, GET_AUTH } from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

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
                  <>
                    <Avatar
                      alt="avatar"
                      src={JSON.parse(data.profile).picture}
                    />
                    {JSON.parse(data.profile).roles.includes('admin') ? (
                      <Button
                        onClick={() => props.history.push('/admin')}
                        color="inherit"
                      >
                        Admin
                      </Button>
                    ) : JSON.parse(data.profile).email ? (
                      <Button
                        onClick={() => props.history.push('/dashboard')}
                        color="inherit"
                      >
                        {JSON.parse(data.profile).email}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => props.history.push('/dashboard')}
                        color="inherit"
                      >
                        {JSON.parse(data.profile).firstName +
                          ' ' +
                          JSON.parse(data.profile).lastName}
                      </Button>
                    )}
                    <Button onClick={logout} color="inherit">
                      logout
                    </Button>
                  </>
                )}
              </Mutation>
            )}
          </Toolbar>
        </AppBar>
      )}
    </Query>
  )
}
