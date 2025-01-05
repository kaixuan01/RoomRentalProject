import React, { useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  Alert,
  TextField,
  Box,
} from '@mui/material';
import { showSuccessAlert } from '../../../utils/helpers/alertHelpers';
import { useHTTPReq } from '../../../hooks/HttpReq';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

//   const successReset = useCallback((result) => {
//     showSuccessAlert('Reset Password Successful', result.message, () => {
//       window.location.href = '/';
//     });
//   }, []);

//   const handleSubmit = () => {
//     if (!newPassword || !confirmPassword) {
//       setErrorMessage('Please enter both password fields.');
//     } else if (newPassword.length < 8) {
//       setErrorMessage('Password must be at least 8 characters long.');
//     } else if (!/[A-Z]/.test(newPassword)) {
//       setErrorMessage('Password must contain at least one uppercase letter.');
//     } else if (!/[a-z]/.test(newPassword)) {
//       setErrorMessage('Password must contain at least one lowercase letter.');
//     } else if (!/[0-9]/.test(newPassword)) {
//       setErrorMessage('Password must contain at least one digit.');
//     } else if (!/[@$!%*?&]/.test(newPassword)) {
//       setErrorMessage('Password must contain at least one special character.');
//     } else if (newPassword !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//     } else {
//       setErrorMessage('');

//     }
//   };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      className="login-container"
    >
      <Card
        sx={{
          width: 400,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardHeader
          title="Reset Password"
          titleTypographyProps={{
            align: 'center',
            fontSize: 24,
            fontWeight: 'bold',
          }}
          sx={{ pb: 1 }}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            margin="normal"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pt: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSubmit(sendRequest)}
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  py: 1,
                  borderRadius: 20,
                }}
              >
                Submit
              </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
