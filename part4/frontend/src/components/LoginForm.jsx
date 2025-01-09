const LoginForm = ({ submitAction, usernameVal, usernameFunc, passwordVal, passwordFunc }) => (
    <div>
    <h2>log in to blog application</h2>
    <form onSubmit={submitAction}>
        <div>
          username
            <input
            type="text"
            value={usernameVal}
            name="Username"
            onChange={({ target }) => usernameFunc(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={passwordVal}
            name="Password"
            onChange={({ target }) => passwordFunc(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  export default LoginForm