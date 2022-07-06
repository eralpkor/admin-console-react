// Redux action creators for actions related to users. Public action creators are exposed via the userActions object at the top of the file and function implementations are located below

// Most of the actions for users are async actions that are made up of multiple sub actions, this is because they have to make an http request and wait for the response before completing. Async actions typically dispatch a request action before performing an async task (e.g. an http request), and then dispatch a success or error action based on the result of the async task.

// For example the login() action creator performs the following steps:

// dispatches a LOGIN_REQUEST action with dispatch(request({ username }));
// calls the async task userService.login(username, password)
// dispatches a LOGIN_SUCCESS with dispatch(success(user)); if login was successful, or dispatches a LOGIN_FAILURE action with dispatch(failure(error)); if login failed

// To keep the code tidy I've put sub action creators into nested functions within each async action creator function. For example the login() function contains 3 nested action creator functions for request(), success() and failure() that return the actions LOGIN_REQUEST, LOGIN_SUCCESS and LOGIN_FAILURE respectively. Putting the sub action creators into nested functions also allows me to give them standard names like request, success and failure without clashing with other function names because they only exist within the scope of the parent function

import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "../../utils/history";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};

function login(username, password, from) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push(from);
        window.location.reload();
      },
      (error) => {
        error = error.response.data.message;
        console.log("WHAT is error", error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        window.location.reload();

        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
