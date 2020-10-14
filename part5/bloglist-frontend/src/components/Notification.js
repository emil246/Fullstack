import React from 'react'

const Notification = ({ message, type }) => {
  if (!message) return null

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className="error" style={type === 'error' ? errorStyle : notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
