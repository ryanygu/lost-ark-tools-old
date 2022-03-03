import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Container from '@material-ui/core/Container'

import Leaderboards from './components/Leaderboards'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import Engraving from './components/Engraving'

import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeEngravings, getStatistics } from './reducers/engravingReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const engravings = useSelector(state => state.engravings)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeUsers())
    dispatch(initializeEngravings())
    dispatch(getStatistics())
  }, [dispatch])

  return (

    <Container>
      <Navbar />
      <Notification />
      <h2 style={{ textAlign: 'center' }}>Lost Ark Tools</h2>
      <Switch>
        <Route path='/leaderboards'>
          { user ? <Leaderboards /> : <Redirect to='/' /> }
        </Route>
        <Route path='/engraving'>
          { user ? <Engraving engravings={engravings} user={user} /> : <Redirect to='/' /> }
        </Route>
        <Route path='/'>
          <h1 style={{ 'textAlign':'center' }}>Home</h1>
          { user ? null : <LoginForm />}
        </Route>
      </Switch>
    </Container>
  )
}

export default App