import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const { resetField: resetUsername, ...username } = useField('text')
  const { resetField: resetPassword, ...password } = useField('text')

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login({
      username: username.value,
      password: password.value
    }))
    resetUsername()
    resetPassword()
    dispatch(setNotification(`Welcome ${username.value}!`, 3))
  }


  return (
    <form onSubmit={handleLogin}>

      <div>
        <TextField
          label='Username'
          id='username'
          {...username}
        />
      </div>

      <div>
        <TextField
          label='Password'
          id='password'
          type='password'
          {...password}
        />
      </div>

      <Button variant="contained" color="primary" id='login-button' type="submit">login</Button>

    </form>
  )
}

export default LoginForm
