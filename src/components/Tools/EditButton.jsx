import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { jobActions } from "../../store/actions/job.actions";

export const EditButton = (params) => {
  const [state, setState] = useState();
  const jobs = useSelector((state) => state.jobs);
  let jobId = 0;
  const dispatch = useDispatch();

  // const getItem = (id) => {
  //   return axios
  //     .get(`http://localhost:5000/api/private/jobs/update/${id}`)
  //     .then((res) => {
  //       console.log("This is full id data ", res.data.job);
  //       return res.data.job;
  //     });
  // };
  // useEffect(() => {
  //   dispatch(jobActions.getById(jobId));
  // }, [jobId]);

  const handleClick = (e) => {
    // setState(getItem(params.id));
    console.log("handle click ", params.id);
    jobId = params.id;
    console.log("JOBID  ", jobId);
    dispatch(jobActions.getById(jobId));
  };

  // useEffect(() => {
  //   setState(getItem());
  //   console.log("what is job after click ", state);
  // }, []);

  return (
    <strong>
      <Link to="/edit">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={handleClick}
          jobid={jobId}
        >
          Info
        </Button>
      </Link>
    </strong>
  );
};

// onClick={() => {
//   console.log(params);
//   console.log(getItem(params.id));
//   setState(params.id);

// }}
