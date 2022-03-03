const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      notification
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        notification: null
      })
    }, time * 1000)
  }
}

export default notificationReducer