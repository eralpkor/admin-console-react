import { jobConstants } from "../store/constants/job.constants";

export function singleJob(state = {}, action) {
  switch (action.type) {
    // get one job
    case jobConstants.GETONE_REQUEST:
      return {
        ...state,
        loading: true,
        items: action.jobs,
      };
    case jobConstants.GETONE_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.jobs,
      };
    case jobConstants.GETONE_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
}
