import axios from "axios";
import { authHeader } from "../../utils/auth-headers";
const apiUrl = "http://localhost:5000/api/private";

export const customerService = {
  getAll,
};

function getAll() {
  return axios
    .get(`${apiUrl}/customers`, { headers: authHeader() })
    .then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function handleResponse(response) {
  const data = response.data;

  if (!response.statusText === "OK") {
    console.log("response status ", response.statusText);
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      window.location.reload(true);
    }
    const error = data.message || response.statusText;
    return Promise.reject(error);
  }
  console.log("what is response in customers.service ", data.customers);

  return data.customers;
}
