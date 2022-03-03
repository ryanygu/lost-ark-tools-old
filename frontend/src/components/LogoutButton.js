import React from 'react'
import { logout } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Button id='nav-logout' variant='outlined' color="secondary" onClick={handleLogout}>
            logout
    </Button>
  )
}

export default LogoutButton
