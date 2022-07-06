// The login page is a react hooks component that renders a login form with username and
// password fields. It displays validation messages for invalid fields when the user
// attempts to submit the form. If the form is valid, submitting it causes the dispatch
// (userActions.login(username, password)) to be called, which dispatches the redux action
// userActions.login(username, password).

// The useEffect() hook function calls dispatch(userActions.logout()) which dispatches the
// userActions.logout() redux action to log the user out if they are logged in, this
// enables the login page to also be used as the logout page.

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../store/actions/user.actions";

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    // console.log("LOGIN page inputs", inputs);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      console.log("what is from ", from);
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <div
      className="col-lg-4 col-md-8 offset-md-2 offset-lg-4"
      style={{ marginTop: "3rem" }}
    >
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !username ? " is-invalid" : "")
            }
          />
          {submitted && !username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !password ? " is-invalid" : "")
            }
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Login
          </button>
          <Link to="/register" className="btn btn-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export { LoginPage };
