import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => (
  <form onSubmit={e => handleLogin(e)}>
    <div>
        username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={e => setUsername(e.target.value)}
        id='username'
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={e => setPassword(e.target.value)}
        id='password'
      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm