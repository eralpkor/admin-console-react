import React, { useState, useEffect } from "react";
import { jobActions } from "../../store/actions/job.actions";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../utils/history";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, Row, Col } from "react-bootstrap";

export const EditJob = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const [job, setJob] = useState({
    loading: false,
  });
  const user = useSelector((state) => state.authentication.user);
  const users = useSelector((state) => state.users);
  const jobs = useSelector((state) => state.jobs);
  const singleJob = useSelector((state) => state.singleJob);
  const dispatch = useDispatch();
  const {
    user_id,
    job_title,
    job_description,
    in_progress,
    id,
    due_date,
    customer_id,
    created_at,
    balance,
    assigned_to,
    amount_paid_1,
    amount_paid_2,
    amount_paid_3,
  } = singleJob.item;
  // useEffect(() => {
  //   dispatch(jobActions.update());
  // });
  // const userName = users.map
  // console.log("users ", users);

  console.log("EDit job ", singleJob.item);

  const [inputs, setInputs] = useState({
    id: id,
    job_title: job_title,
    job_description: job_description,
    due_date: due_date,
    balance: balance,
    assigned_to: assigned_to,
    amount_paid_1: amount_paid_1,
    amount_paid_2: amount_paid_2,
    amount_paid_3: amount_paid_3,
    customer_id: customer_id,
    in_progress: in_progress,
    created_at: created_at,
    user_id: user.id, // logged in user
  });

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   setSubmitted(true);
  //   if (
  //     job_title &&
  //     job_description &&
  //     due_date &&
  //     amount &&
  //     customer_id &&
  //     user_id
  //   ) {
  //     dispatch(jobActions.createJob(inputs));
  //     history.push("/");
  //     console.log("JOB object ", inputs);
  //   }
  // }

  return (
    <div
      className="col-lg-4 col-md-8 offset-md-2 offset-lg-4"
      style={{ marginTop: "3rem" }}
    >
      <h2>Edit Job</h2>
      <Form name="form">
        <Row>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput">Title</Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              defaultValue={job_title}
              value={job_title}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
