import axios from "axios";
import { authHeader } from "../../utils/auth-headers";
const apiUrl = "http://localhost:5000/api";

export const jobService = {
  getAll,
  update,
  createJob,
  getById,
};

function getAll() {
  return axios
    .get(`${apiUrl}/private/jobs`, { headers: authHeader() })
    .then(handleResponse);
}

function getById(id) {
  console.log("What is ID in job service ", id);
  return axios
    .get(`${apiUrl}/private/jobs/${id}`, { headers: authHeader() }, id)
    .then(handleResponse);
}

// EDIT a job
function update(job) {
  return axios
    .put(
      `${apiUrl}/private/jobs/update/${job.id}`,
      { headers: authHeader() },
      job
    )
    .then(handleResponse);
}

// ADD a single job
function createJob(job) {
  return axios
    .post(`${apiUrl}/private/jobs/create`, job)
    .then((res) => {
      console.log("what is createJob response ", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("Create job error ", error);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function handleResponse(response) {
  const data = response.data;
  console.log("what is response in job.service ", data);

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
  console.log("Whats data here", data.jobs);

  return data.jobs;
}
