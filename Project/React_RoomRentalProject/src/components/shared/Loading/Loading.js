import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "./LoadingContext";

const Loading = () => {
  const { loading } = useLoading(); // Access global loading state

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 10000, // Use a very high z-index to appear above everything
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
