import { jobConstants } from "../constants/job.constants";
import { jobService } from "../services/job.service";
import { alertActions } from "./alert.actions";
import { history } from "../../utils/history";

export const jobActions = {
  getAll,
  update,
  createJob,
  getById,
};

// GET all jobs from the server
function getAll() {
  return (dispatch) => {
    dispatch(request());

    jobService.getAll().then(
      (jobs) => dispatch(success(jobs)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: jobConstants.GETALL_REQUEST };
  }
  function success(jobs) {
    return { type: jobConstants.GETALL_SUCCESS, jobs };
  }
  function failure(error) {
    return { type: jobConstants.GETALL_FAILURE, error };
  }
}

// POST add single job
function createJob(job) {
  return (dispatch) => {
    dispatch(request(job));

    jobService.createJob(job).then(
      (job) => {
        dispatch(success(job));
        history.push("/");
        window.location.reload();
        dispatch(alertActions.success("New job added to the database"));
      },

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(job) {
    return { type: jobConstants.CREATE_REQUEST, job };
  }
  function success(job) {
    return { type: jobConstants.CREATE_SUCCESS, job };
  }
  function failure(error) {
    return { type: jobConstants.CREATE_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    request(id);

    jobService.getById(id).then(
      (job) => dispatch(success(job)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: jobConstants.GETONE_REQUEST };
  }
  function success(jobs) {
    return { type: jobConstants.GETONE_SUCCESS, jobs };
  }
  function failure(error) {
    return { type: jobConstants.GETONE_FAILURE, error };
  }
}

// PUT EDIT single job
function update(id) {
  return (dispatch) => {
    dispatch(request(id));

    jobService.update.then(
      (job) => dispatch(success(job)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: jobConstants.EDIT_REQUEST };
  }
  function success(jobs) {
    return { type: jobConstants.EDIT_SUCCESS, jobs };
  }
  function failure(error) {
    return { type: jobConstants.EDIT_FAILURE, error };
  }
}
