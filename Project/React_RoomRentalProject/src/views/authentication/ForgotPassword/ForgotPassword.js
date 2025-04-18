import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, Stack, Typography, TextField, Button } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { showErrorAlert, showSuccessAlert } from '../../../utils/helpers/alertHelpers';
import { useHTTPReq } from '../../../hooks/HttpReq';
import MyGrid from '../../../components/container/MyGrid';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { HTTPReq } = useHTTPReq(); 
  const navigate = useNavigate();
    
  const handleSend = () => {
    HTTPReq({
        url: `/OAuth/ForgotPassword`,
        data: {email: email}, 
        method: 'POST',
        onSuccess: (data, msg) => {
            showSuccessAlert('Send reset password email to:', email).then(() => {
              navigate('/auth/ownerLogin');
            });
        },
        onError: (error) => {
            showErrorAlert(error);
        },
    });
  };

  return (
    <PageContainer title="Forgot Password" description="this is Forgot Password page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <MyGrid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <MyGrid
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                <Logo />
              </Box>
              <Typography variant="h5" textAlign="center" mb={2}>
                Forgot Password
              </Typography>
              <Typography variant="body2" textAlign="center" color="textSecondary" mb={3}>
                Enter your email address below and we’ll send you a link to reset your password.
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSend}
                  disabled={!email.trim()}
                >
                  Send
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="body2">
                  Remember your password?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/ownerLogin"
                  sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500 }}
                >
                  Back to Login
                </Typography>
              </Stack>
            </Card>
          </MyGrid>
        </MyGrid>
      </Box>
    </PageContainer>
  );
};

export default ForgotPassword;