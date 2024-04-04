import React from "react";
import { Skeleton, TextField, Button } from "@mui/material";

const FormSkeleton = () => {
  return (
    <form className="form">
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Skeleton animation="wave" variant="rect" height={40} />
      <Button variant="contained" color="primary" disabled>
        Submit
      </Button>
    </form>
  );
};

export default FormSkeleton;
