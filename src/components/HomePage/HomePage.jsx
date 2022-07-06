// The home page is a react hooks component that is displayed after signing in to the
// application, it shows the signed in user's name plus a list of all registered users in
// the tutorial application. The users are loaded into redux state by calling dispatch
// (userActions.getAll()) from the useEffect() React hook, which dispatches the redux
// action userActions.getAll().

// Users can also be deleted from the user list, when the delete link is clicked it calls
// the handleDeleteUser(user.id) function which dispatches the redux action userActions.
// delete(id)

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../store/actions/user.actions";

function HomePage() {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);
  // console.log("Users in home page: ", users.items);
  // console.log("Users loading : ", users);
  console.log("user state in home page ", user);
  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Hi {user.first_name}!</h1>
      <p>You're logged in</p>
      <h3>All registered users:</h3>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items && (
        <ul>
          {users.items.users.map((user, index) => (
            <li key={user.id}>
              {user.first_name + " " + user.last_name}
              {user.deleting ? (
                <em> - Deleting...</em>
              ) : user.deleteError ? (
                <span className="text-danger">
                  {" "}
                  - ERROR: {user.deleteError}
                </span>
              ) : (
                <span>
                  {" "}
                  -{" "}
                  <a
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-primary"
                  >
                    Delete
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}

export { HomePage };
