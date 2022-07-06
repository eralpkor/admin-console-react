import { jobConstants } from "../store/constants/job.constants";

export function jobs(state = {}, action) {
  const { type, payload } = action;
  // console.log("jobs reducer ", type, payload);
  switch (type) {
    // GET all jobs
    case jobConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case jobConstants.GETALL_SUCCESS:
      return {
        items: action.jobs,
      };
    case jobConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    // PUT edit an existing job
    case jobConstants.EDIT_REQUEST:
      return {
        ...state,
        items: state.items.map((job) =>
          job.id === action.id ? { ...job, editing: true } : job
        ),
      };
    case jobConstants.EDIT_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
