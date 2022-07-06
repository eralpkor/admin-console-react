import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularLoading from "../../utils/Spinner";
import { EditButton } from "../Tools/EditButton";
import { NewJobButton } from "../Toolbar/NewButton";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { customerActions } from "../../store/actions/customer.actions";
const apiUrl = "http://localhost:5000/api";

const columns = [
  {
    field: "id",
    headerName: "Job ID",
    type: "string",
    width: 50,
  },
  {
    field: "first_name",
    headerName: "First Name",
    type: "string",
    width: 150,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    type: "string",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone:",
    type: "string",
    width: 200,
  },
  {
    field: "company",
    headerName: "company",
    type: "string",
    width: 200,
  },
  {
    field: "notes",
    headerName: "Notes",
    type: "string",
    width: 300,
  },
  {
    field: "button",
    headerName: "Edit",
    width: 120,
    renderCell: EditButton,
    disableClickEventBubbling: true,
  },
];

const handleClick = () => {
  return <Navigate to="/addcustomer" replace />;
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Link to="addcustomer">
        <NewJobButton onClick={handleClick} name="Add Customer" />
      </Link>
    </GridToolbarContainer>
  );
}

export const CustomersPage = () => {
  const customers = useSelector((state) => state.customers);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customerActions.getAll());
  }, []);

  return (
    <div style={{ height: "100%", width: "90%", margin: "auto" }}>
      <h1>Admin Console Customers</h1>
      {customers.loading && <CircularLoading />}
      {customers.error && (
        <span className="text-danger">ERROR: {customers.error}</span>
      )}
      {customers.items && (
        <DataGrid
          autoHeight
          rows={customers.items}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      )}
    </div>
  );
};
