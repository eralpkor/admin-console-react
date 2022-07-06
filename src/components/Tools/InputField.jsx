import { TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { RegisterPage } from "../RegisterPage/RegisterPage";

// export const Input = forwardRef((props, ref) => {
//   return (
//     <TextField
//       variant="outlined"
//       margin="normal"
//       ref={ref}
//       fullWidth
//       {...props}
//     />
//   );
// });

export const Input = forwardRef(
  ({ onChange, onBlur, name, label, required, register }, ref) => {
    return (
      <>
        <label>{label}</label>
        <TextField {...register(label, { required })} />
      </>
    );
  }
);
