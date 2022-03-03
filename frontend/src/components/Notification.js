import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  if (notification === null) {
    return null
  }

  else if (notification.includes('Success') || notification.includes('Welcome')) {
    return (
      <Alert severity="success">
        {notification}
      </Alert>
    )
  }

  return (
    <Alert severity="danger">
      {notification}
    </Alert>
  )
}

export default Notification