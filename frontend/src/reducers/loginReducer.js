import loginService from '../services/login'
import engravingService from '../services/engravings'

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case('SET_USER'):
    return action.data
  case('INIT_USER'):
    return action.data
  case('LOGOUT_USER'):
    return action.data
  default:
    return state
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('LAT_USER')
    dispatch({
      type: 'LOGOUT_USER',
      data: null
    })
  }
}

export const login = (user) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(user)
      window.localStorage.setItem(
        'LAT_USER', JSON.stringify(loggedUser)
      )
      engravingService.setToken(loggedUser.token)
      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
    } catch (e) {
      return e
    }
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('LAT_USER')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      engravingService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export default loginReducer