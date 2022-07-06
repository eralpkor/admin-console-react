import { customerConstants } from "../constants/customer.constants";
import { customerService } from "../services/customer.service";

export const customerActions = {
  getAll,
};

// GET all CUSTOMERS from the server
function getAll() {
  console.log("are we hitting here? ");

  return (dispatch) => {
    dispatch(request());

    customerService.getAll().then(
      (customers) => dispatch(success(customers)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: customerConstants.GETALL_REQUEST };
  }
  function success(customers) {
    return { type: customerConstants.GETALL_SUCCESS, customers };
  }
  function failure(error) {
    return { type: customerConstants.GETALL_FAILURE, error };
  }
}
