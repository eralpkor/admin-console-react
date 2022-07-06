import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Navigate, Router } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";

// import { history } from "./helpers/history";
import { alertActions } from "./store/actions/alert.actions";
import { PrivateRoute } from "./utils/PrivateRoute";
import { HomePage } from "./components/HomePage/HomePage";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { RegisterPage } from "./components/RegisterPage/RegisterPage";
import { createBrowserHistory } from "history";
import CustomToolbarGrid from "./components/HomePage/DataGrid";
import { AddNewJob } from "./components/NewJobPage/AddNewJobPage";
import { CustomersPage } from "./components/Customers/Customers";
import { Navigation } from "./components/Navigation/NavigationBar";
import { Layout } from "./components/Navigation/Layout";
import { EditJob } from "./components/EditJob/EditJob";

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const user = useSelector((state) => state.authentication.user);
  // console.log("What is user in APP ", user.is_admin);
  // useEffect(() => {
  //   history.listen((location, action) => {
  //     // clear alert on location change
  //     dispatch(alertActions.clear());
  //   });
  // }, []);

  useEffect(() => {
    // clear alert on timeOut
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      // setShow(false);
      dispatch(alertActions.clear());
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <>
      <div className="">
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Layout>
          <Routes>
            <Route path="addjob" element={<AddNewJob />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <CustomToolbarGrid />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <PrivateRoute>
                  <EditJob />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;

// color #282c34

// <Routes>
//           <Route path="/addjob" element={<AddNewJob />} />
//           <Route path="/customers" element={<CustomersPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route
//             path="/"
//             element={
//               <PrivateRoute>
//                 <CustomToolbarGrid />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             exact
//             path="/users"
//             element={
//               <PrivateRoute>
//                 <HomePage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="*" element={<p>There's nothing here: 404!</p>} />
//         </Routes>

/*
 <Routes>
          <Route path="/" element={<Navigation />}>
            {/* <Route index element={<HomePage />} /> /}
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/home" element={<CustomToolbarGrid />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

  */
