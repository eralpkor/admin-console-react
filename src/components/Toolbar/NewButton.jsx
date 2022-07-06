import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export const NewJobButton = ({ name = "name" }) => {
  return (
    <Button>
      <AddIcon style={{ marginRight: "6px" }} />
      {name}
    </Button>
  );
};
