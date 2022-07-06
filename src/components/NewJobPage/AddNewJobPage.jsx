import React, { useState, useEffect } from "react";
import { jobActions } from "../../store/actions/job.actions";
import { customerActions } from "../../store/actions/customer.actions";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../utils/history";

import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, Col, Row } from "react-bootstrap";

export const AddNewJob = () => {
  const [submitted, setSubmitted] = useState(false);
  const addingJob = useSelector((state) => state.jobs.addingJob);
  const user = useSelector((state) => state.authentication.user);
  const customers = useSelector((state) => state.customers);
  const [name, setName] = useState(""); // for auto complete
  const [inputs, setInputs] = useState({
    job_title: "",
    job_description: "",
    due_date: "",
    amount: "",
    customer_id: "",
    in_progress: "open",
    user_id: user.id, // logged in user
  });
  const {
    job_title,
    job_description,
    due_date,
    amount,
    customer_id,
    user_id,
    in_progress,
  } = inputs;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerActions.getAll());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setInputs((input) => ({ ...input, customer_id: customerId }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (
      job_title &&
      job_description &&
      due_date &&
      amount &&
      customer_id &&
      user_id
    ) {
      dispatch(jobActions.createJob(inputs));
      history.push("/");
      console.log("JOB object ", inputs);
    }
  }

  const [singleSelections, setSingleSelections] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const typeHeadChange = (selected) => {
    console.log(selected[0].id);
    setSingleSelections(selected);
    setCustomerId(selected[0].id);
  };

  const progressSelectionChange = (selected) => {
    selected.preventDefault();

    console.log(selected.target.value);
  };

  return (
    <div
      className="col-lg-4 col-md-8 offset-md-2 offset-lg-4"
      style={{ marginTop: "3rem" }}
    >
      <h2>Add New Job</h2>
      <Form name="form" onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="First name"
            />
          </Col>
          <Col>
            <Form.Control placeholder="Last name" />
          </Col>
        </Row>
        {/* auto complete  */}
        <div className="form-group">
          <label>Customer</label>
          <Typeahead
            labelKey={(name) => `${name.first_name} ${name.last_name}`}
            onChange={typeHeadChange}
            options={customers.items}
            placeholder="Select customer..."
            selected={singleSelections}
            id="type-head"
            name="customer_id"
          />
          <div className="invalid-feedback">Customer name is required</div>
          {submitted && !inputs.customer_id && (
            <div className="invalid-feedback">Customer name is required</div>
          )}
        </div>
        {/* customer  */}

        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="job_title"
            value={job_title}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !job_title ? " is-invalid" : "")
            }
          />
          {submitted && !job_title && (
            <div className="invalid-feedback">Job Title is required</div>
          )}
        </div>
        {/* Description */}
        <div className="form-group">
          <label>Job Description</label>
          <input
            type="text"
            name="job_description"
            value={job_description}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !job_description ? " is-invalid" : "")
            }
          />
          {submitted && !job_description && (
            <div className="invalid-feedback">Job Description is required</div>
          )}
        </div>
        {/* in progress  */}
        <div className="form-group">
          <Form.Select
            onChange={progressSelectionChange}
            aria-label="Default select example"
          >
            <option selected>Progress...</option>
            <option value="open">Open</option>
            <option value="in-progress">In-Progress</option>
            <option value="closed">Closed</option>
          </Form.Select>
        </div>
        {/* amount  */}
        <div className="form-group">
          <label>Total Amount</label>
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !amount ? " is-invalid" : "")
            }
          />
          {submitted && !amount && (
            <div className="invalid-feedback">Amount is required</div>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <label>Amount paid 1</label>
              <input
                type="text"
                name="amount_paid"
                value={amount}
                onChange={handleChange}
                className={
                  "form-control" + (submitted && !amount ? " is-invalid" : "")
                }
              />
              {submitted && !amount && (
                <div className="invalid-feedback">Amount is required</div>
              )}
            </div>
            <div className="row">
              <label>Amount paid 2</label>
              <input
                type="text"
                name="amount_paid"
                value={amount}
                onChange={handleChange}
                className={
                  "form-control" + (submitted && !amount ? " is-invalid" : "")
                }
              />
              {submitted && !amount && (
                <div className="invalid-feedback">Amount is required</div>
              )}
            </div>
            <div className="row">
              <label>Amount paid 3</label>
              <input
                type="text"
                name="amount_paid"
                value={amount}
                onChange={handleChange}
                className={
                  "form-control" + (submitted && !amount ? " is-invalid" : "")
                }
              />
              {submitted && !amount && (
                <div className="invalid-feedback">Amount is required</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Balance Due</label>
          <input
            type="text"
            name="amount_paid"
            value={amount}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !amount ? " is-invalid" : "")
            }
          />
          {submitted && !amount && (
            <div className="invalid-feedback">Amount is required</div>
          )}
        </div>
        <div className="form-group">
          <Form.Select
            onChange={progressSelectionChange}
            aria-label="Default select example"
          >
            <option selected>Type of Payment</option>
            <option value="open">Check</option>
            <option value="in-progress">Cash</option>
            <option value="closed">ACH</option>
          </Form.Select>
        </div>

        {/* due_date  */}
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="text"
            name="due_date"
            value={due_date}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !due_date ? " is-invalid" : "")
            }
          />
          {submitted && !due_date && (
            <div className="invalid-feedback"> Due date is required</div>
          )}
        </div>

        <div className="form-group">
          <textarea></textarea>
        </div>

        <div className="form-group">
          <button className="btn btn-primary">
            {addingJob && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Submit Job
          </button>
        </div>
      </Form>
    </div>
  );
};

//  <Checkbox
//             checked={isChecked}
//             onChange={handleCheckBox}
//             label="In-Progress"
//           />
//           <label>In-Progress</label>
//           <Checkbox
//             checked={isChecked}
//             onChange={handleCheckBox}
//             label="In-Progress"
//             disabled={true}
//           />
