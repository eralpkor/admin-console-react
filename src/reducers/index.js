import { combineReducers } from "redux";
import { alert } from "./alert.reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { jobs } from "./jobs.reducer";
import { createJob } from "./addJob.reducer";
import { customers } from "./customers.reducer";
import { singleJob } from "./editJob..reducer";

export default combineReducers({
  alert,
  authentication,
  registration,
  users,
  jobs,
  createJob,
  customers,
  singleJob,
});
