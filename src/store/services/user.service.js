// The user service encapsulates all backend api calls for performing CRUD operations on
// user data, as well as logging and out of the example application. The service methods
// are exported via the userService object at the top of the file, and the implementation
// of each method is located in the function declarations below.

// In the handleResponse method the service checks if the http response from the api is 401
// Unauthorized and automatically logs the user out. This handles if the JWT token expires
// or is no longer valid for any reason.

// import config from "config";
import axios from "axios";
import { authHeader } from "../../utils/auth-headers";
const apiUrl = "http://localhost:5000/api";
const currentUser = JSON.parse(localStorage.getItem("user"));
if (currentUser) {
  console.log(currentUser.is_admin);
}
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  authenticationService,
};

function authenticationService() {
  return currentUser.is_admin;
}

function login(username, password) {
  return axios
    .post(apiUrl + "/authenticate", {
      username,
      password,
    })
    .then(handleResponse)
    .then((response) => {
      console.log("response from auth.service ", response);
      if (response.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(response));
      }

      return response;
    });
  // .catch((error) => {
  //   console.log(error.message);
  //   logout();
  //   window.location.reload();
  // });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  return axios
    .get(`${apiUrl}/users`, { headers: authHeader() })
    .then(handleResponse);
}

function getById(id) {
  return axios
    .get(`${apiUrl}/user/${id}`, { headers: authHeader() })
    .then((ids) => {
      console.log(ids);
    });
}

function register(user) {
  return axios.post(`${apiUrl}/register`, user).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  console.log("what is handleResponse in user.service ", data);

  if (!response.statusText === "OK") {
    console.log("response status ", response.statusText);
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      console.log("What is response error ", response);
      logout();
      window.location.reload(true);
    }
    const error = data.message || response.statusText;
    console.log("error from user Service ", error);
    return Promise.reject(error);
  }
  console.log("Whats data here", data);

  return data;
}
