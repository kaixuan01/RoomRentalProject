import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardActions, Button, Alert, TextField, Link } from "@mui/material";
import { showErrorAlert } from "../../../Common";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (sendRequest) => {
    if (!email) {
      setErrorMessage("Please enter your email address.");
    } else if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else {
      setErrorMessage(""); // Clear any previous error message
      sendRequest();
    }
  };

  const successRequest = useCallback((message) => {
    showSuccessAlert(message);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        elevation={3}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "24px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <CardHeader
          title="Forgot Password"
          titleTypographyProps={{
            align: "center",
            variant: "h5",
            style: { fontWeight: 600 },
          }}
          style={{ paddingBottom: "16px" }}
        />
        {errorMessage && (
          <Alert severity="error" style={{ marginBottom: "16px" }}>
            {errorMessage}
          </Alert>
        )}
        <CardContent style={{ paddingBottom: "16px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
              <Button
                onClick={() => handleSubmit(sendRequest)}
                variant="contained"
                color="success"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  padding: "10px 20px",
                  borderRadius: "24px",
                }}
              >
                Submit
              </Button>
          <Link
            component={RouterLink}
            to="/Login"
            style={{
              marginTop: "8px",
              textDecoration: "none",
              fontSize: "14px",
              color: "#1976d2",
              fontWeight: "500",
            }}
          >
            Back to Login
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
