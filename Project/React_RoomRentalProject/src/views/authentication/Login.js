import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  Stack,
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
} from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { showErrorAlert, showSuccessAlert } from '../../utils/helpers/alertHelpers';
import { useHTTPReq } from 'src/hooks/HttpReq';
import { useAuthHandlers } from 'src/hooks/AuthHandlers';
import MyGrid from '../../components/container/MyGrid';

const Login2 = () => {
  const { HTTPReq } = useHTTPReq();
  const { handleLogin } = useAuthHandlers();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAuthLogin = () => {
    HTTPReq({
      url: `/OAuth`,
      data: formData,
      method: 'POST',
      onSuccess: (data, msg) => {
        handleLogin();
        showSuccessAlert('Login Success');
      },
      onError: (error) => {
        showErrorAlert(error);
      },
      customHandlers: {
        401: (response) => {
          showErrorAlert("Custom message: You need to re-login.");
        },
        404: (response) => {
          showErrorAlert("Custom message: Data not found!");
        },
      },
    });
  };

  return (
    <PageContainer title="Login" description="This is the Login page">
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
            xs={6}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
                mb={1}
              >
                Where You Feel at Home
              </Typography>
              <Stack>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="username"
                    mb="5px"
                  >
                    Username
                  </Typography>
                  <CustomTextField
                    id="username"
                    variant="outlined"
                    fullWidth
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box mt="25px">
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="password"
                    mb="5px"
                  >
                    Password
                  </Typography>
                  <CustomTextField
                    id="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember this Device"
                    />
                  </FormGroup>
                  <Typography
                    component={Link}
                    to="/auth/ForgotPassword"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Stack>
              </Stack>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleAuthLogin}
                  type="submit"
                >
                  Sign In
                </Button>
              </Box>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  New to Modernize?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            </Card>
          </MyGrid>
        </MyGrid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
