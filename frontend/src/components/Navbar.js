import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'
import LogoutButton from './LogoutButton'



const Navbar = () => {
  const user = useSelector(state => state.user)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color="inherit" id='nav-home' component={Link} to='/'>
          home
        </Button>
        <Button color="inherit" id='nav-engraving' component={Link} to='/engraving'>
          engraving
        </Button>
        <Button color="inherit"  id='nav-leaderboards' component={Link} to='/leaderboards'>
          leaderboards
        </Button>
        {user &&
          <em>Logged in as: {user.name} <LogoutButton /></em>
        }
      </Toolbar>
    </AppBar>
  )
}


export default Navbar
