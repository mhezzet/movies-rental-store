import React, { useState } from 'react'
import { string, object } from 'yup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default function RegisterForm({
  submitHandler,
  type = 'regiser',
  serverError = '',
  isloading = false
}) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const changeHandler = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const onSubmit = () => {
    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        setEmailError('')
        setPasswordError('')

        submitHandler(values)
      })
      .catch(error => {
        if (error.inner) {
          error.inner.forEach(err => {
            if (err.path === 'email') setEmailError(err.message)
            if (err.path === 'password') setPasswordError(err.message)
          })
        }
      })
  }

  return (
    <div style={style.container}>
      <Typography style={style.error} variant="subtitle1" gutterBottom>
        {serverError.includes('email is not available')
          ? 'email is not available'
          : serverError}
      </Typography>
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        onChange={changeHandler('email')}
        error={!!emailError}
      />
      <Typography variant="caption" gutterBottom style={style.error}>
        {emailError}
      </Typography>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
        onChange={changeHandler('password')}
        error={!!passwordError}
      />
      <Typography variant="caption" gutterBottom style={style.error}>
        {passwordError}
      </Typography>

      <Button
        onClick={onSubmit}
        variant="contained"
        style={style.button}
        disabled={isloading}
      >
        {type}
      </Button>
    </div>
  )
}

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem'
  },
  button: {
    alignSelf: 'center'
  },
  error: {
    color: '#f44336'
  }
}

const schema = object().shape({
  email: string()
    .email()
    .max(50)
    .required('email is required'),
  password: string()
    .max(1024)
    .min(4)
    .required('password is required')
})
