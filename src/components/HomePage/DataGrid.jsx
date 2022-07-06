import * as React from "react";
import { useEffect } from "react";
import { EditButton } from "../Tools/EditButton";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { jobActions } from "../../store/actions/job.actions";
import CircularLoading from "../../utils/Spinner";
import { NewJobButton } from "../Toolbar/NewButton";
import { Link, Navigate, useLocation } from "react-router-dom";

function getFullName(params) {
  return `${params.row.first_name || ""} ${params.row.last_name || ""}`;
}

const adminColumn = [
  { field: "id", headerName: "ID", width: 23 },
  {
    field: "username",
    headerName: "Admin",
    type: "string",
    width: 100,
  },
  // add assigned person here

  {
    field: "assigned_to",
    headerName: "Processor",
    type: "string",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Customer Name",
    width: 160,
    valueGetter: getFullName,
  },
  {
    field: "job_title",
    headerName: "Job Type",
    type: "string",
    width: 120,
    editable: true,
  },
  { field: "created_at", headerName: "Date", type: "number", width: 100 },

  {
    field: "job_description",
    headerName: "Job Description",
    type: "string",
    width: 190,
  },
  {
    field: "in_progress",
    headerName: "Status",
    type: "string",
    width: 150,
  },
  {
    field: "due_date",
    headerName: "Due Date",
    type: "string",
    width: 200,
  },

  {
    field: "customer_id",
    headerName: "Customer",
    type: "string",
    width: 90,
  },
  {
    field: "user_id",
    headerName: "User",
    type: "string",
    width: 90,
  },

  {
    field: "balance",
    headerName: "$ Balance",
    width: 90,
  },
  {
    field: "button",
    headerName: "Edit",
    width: 120,
    renderCell: EditButton,
    disableClickEventBubbling: true,
  },
];

const userColumn = [
  { field: "id", headerName: "ID", width: 23 },
  {
    field: "username",
    headerName: "Admin",
    type: "string",
    width: 100,
  },
  // add assigned person here

  {
    field: "assigned_to",
    headerName: "Processor",
    type: "string",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Customer Name",
    width: 160,
    valueGetter: getFullName,
  },
  {
    field: "job_title",
    headerName: "Job Type",
    type: "string",
    width: 120,
    editable: true,
  },
  { field: "created_at", headerName: "Date", type: "number", width: 100 },

  {
    field: "job_description",
    headerName: "Job Description",
    type: "string",
    width: 190,
  },
  {
    field: "in_progress",
    headerName: "Status",
    type: "string",
    width: 150,
  },
  {
    field: "due_date",
    headerName: "Due Date",
    type: "string",
    width: 200,
  },
  {
    field: "button",
    headerName: "Edit",
    width: 120,
    renderCell: EditButton,
    disableClickEventBubbling: true,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Link to="addjob">
        <NewJobButton name="Add Job" />
      </Link>
    </GridToolbarContainer>
  );
}

export default function CustomToolbarGrid(props) {
  const jobs = useSelector((state) => state.jobs);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  console.log("USER in grid  ", user.is_admin);

  useEffect(() => {
    dispatch(jobActions.getAll());
  }, []);

  return (
    <div style={{ height: "100%", width: "90%", margin: "auto" }}>
      <h1>JOBS</h1>
      {jobs.loading && <CircularLoading />}
      {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>}
      {jobs.items && (
        <DataGrid
          autoHeight
          rows={jobs.items}
          columns={user.is_admin ? adminColumn : userColumn}
          rowsPerPageOptions={[15, 25, 50, 100]}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      )}
    </div>
  );
}

// pageSize={5}
