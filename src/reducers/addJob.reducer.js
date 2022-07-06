import { applyInitialState } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";
import { jobConstants } from "../store/constants/job.constants";

// const initialState = {};

export function createJob(state = {}, action) {
  // POST create a new job
  switch (action.type) {
    case jobConstants.CREATE_REQUEST:
      return { addingJob: true, job: action.job };
    case jobConstants.CREATE_SUCCESS:
      return {
        jobAdded: true,
        job: action.job,
      };
    case jobConstants.CREATE_FAILURE:
      return {};

    default:
      return state;
  }
}
