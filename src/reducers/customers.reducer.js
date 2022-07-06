import { customerConstants } from "../store/constants/customer.constants";

export function customers(state = {}, action) {
  console.log("Customers state ", action);
  switch (action.type) {
    case customerConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case customerConstants.GETALL_SUCCESS:
      return {
        items: action.customers,
      };
    case customerConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
