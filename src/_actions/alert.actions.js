// Contains Redux action creators for actions related to alerts / toaster notifications in the application. For example to display a success alert message with the text 'Registration Successful' you can call dispatch(alertActions.success('Registration successful'));

import { alertConstants } from "../_constants";

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
