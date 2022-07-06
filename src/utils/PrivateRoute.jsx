// The react private route component renders a route component if the user is logged in, otherwise it redirects the user to the /login page with the return url that they were trying to access.

// The way it checks if the user is logged in is by checking that there is a user object in local storage.

import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { userService } from "../store/services/user.service";

function PrivateRoute({ isAdmin, redirectPath = "/login", children }) {
  // console.log("Children from private route ", children);
  const auth = localStorage.getItem("user");
  // const isAdmin = localStorage.getItem("user").id_admin;
  // console.log("What is authentication ", userService.authenticationService());
  // console.log("What is children ", children);
  // if (auth) {
  //   if (auth.is_admin) {
  //     isAdmin = true;
  //   }
  //   // console.log("What is auth in privateRoute ", auth, isAdmin);
  // }
  return auth ? children : <Navigate to="/login" replace />;
}

// function PrivateRoute({ component: Component, roles, ...rest }) {
//   return (
//     <Routes>
//       <Route
//         {...rest}
//         render={(props) => {
//           if (!localStorage.getItem("user")) {
//             console.log("are we hitting herer   ");
//             // not logged in so redirect to login page with the return url
//             return <Navigate to="/login" replace={true} />;
//           }

//           // logged in so return component
//           return <Component {...props} />;
//         }}
//       />
//     </Routes>
//   );
// }

export { PrivateRoute };

// to={{ pathname: "/login", state: { from: props.location } }}
