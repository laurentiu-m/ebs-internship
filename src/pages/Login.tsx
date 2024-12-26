function Login() {
  return (
    <div className="register-container">
      <h1>Login</h1>

      <form>
        <input className="reg-input" type="text" placeholder="Email" />
        <input className="reg-input" type="text" placeholder="Password" />
        <input className="submit-button" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
