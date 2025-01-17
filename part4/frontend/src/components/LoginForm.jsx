import propTypes from 'prop-types'

const LoginForm = ({ submitAction, usernameVal, usernameFunc, passwordVal, passwordFunc }) => (
  <div>
    <h2>log in to blog application</h2>
    <form onSubmit={submitAction} data-testid='login form'>
      <div>
          username
        <input
          type="text"
          value={usernameVal}
          name="Username"
          onChange={({ target }) => usernameFunc(target.value)}
          data-testid='Username'
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={passwordVal}
          name="Password"
          onChange={({ target }) => passwordFunc(target.value)}
          data-testid='Password'
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  submitAction: propTypes.func.isRequired,
  usernameFunc: propTypes.func.isRequired,
  passwordFunc: propTypes.func.isRequired,
  usernameVal: propTypes.string.isRequired,
  passwordVal: propTypes.string.isRequired
}

export default LoginForm