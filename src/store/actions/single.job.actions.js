import { jobConstants } from "../constants/job.constants";
import { jobService } from "../services/job.service";
import { alertActions } from "./alert.actions";
import { history } from "../../utils/history";

export const singleJob = {
  getById,
};

function getById(id) {
  return (dispatch) => {
    request(id);

    jobService.getById.then(
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
