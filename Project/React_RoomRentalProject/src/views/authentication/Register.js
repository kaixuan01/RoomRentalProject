import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  InputAdornment,
  CardContent,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { useHTTPReq } from '../../hooks/HttpReq';
import { showErrorAlert, showSuccessAlert } from '../../utils/helpers/alertHelpers';
import { User_Roles } from '../../utils/enum';
import { isStrongPassword } from '../../utils/helpers/passwordHelpers';
import { Person, AccountCircle, Email, Phone, Lock } from '@mui/icons-material';
import MyGrid from '../../components/container/MyGrid';

const Register2 = () => {
  const { HTTPReq } = useHTTPReq();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    userRoleId: User_Roles.TENANT,
    phone: '',
  });

  const handleRoleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userRoleId: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '', // Clear error when user types
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = 'This field is required.';
      }
    }

    if (formData.password && !isStrongPassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthRegister = () => {
    if (!validateForm()) {
      return;
    }

    HTTPReq({
      url: `/OAuth/ownerRegisterAcc`,
      data: formData,
      method: 'POST',
      onSuccess: (data, msg) => {
        showSuccessAlert(msg).then(() => {
          navigate('/');
        });
      },
      onError: (error) => {
        showErrorAlert(error);
      },
    });
  };

  return (
    <PageContainer title="Register" description="this is Register page">
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
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                Your Social Campaigns
              </Typography>
              <Box>
                <Stack mb={3}>
                  <CustomTextField
                    id="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.name}
                    label="Name"
                    placeholder="Your full name"
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ mt: '10px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <CustomTextField
                    id="username"
                    variant="outlined"
                    fullWidth
                    required
                    label="Username"
                    value={formData.username}
                    placeholder="Username"
                    onChange={handleInputChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ mt: '10px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <MyGrid container spacing={2} mt="10px">
                    <MyGrid xs={6}>
                      <CustomTextField
                        fullWidth
                        required
                        id="password"
                        label="Password"
                        placeholder="••••••"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MyGrid>

                    <MyGrid xs={6}>
                      <CustomTextField
                        fullWidth
                        required
                        id="confirmPassword"
                        label="Confirm Password"
                        placeholder="••••••"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MyGrid>
                  </MyGrid>

                  <CustomTextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.email}
                    label="Email Address"
                    placeholder="your@email.com"
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mt: '10px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <CustomTextField
                    id="phone"
                    variant="outlined"
                    fullWidth
                    required
                    label="Phone No."
                    value={formData.phone}
                    placeholder="0123456789"
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{ mt: '10px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <MyGrid container spacing={2} mt="10px">
                    <MyGrid xs={6}>
                      <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                          <FormControl component="fieldset">
                            <RadioGroup value={formData.userRoleId} onChange={handleRoleChange}>
                              <Tooltip title="As an owner, you can manage your property and make it available for tenants to rent.">
                                <FormControlLabel
                                  value={User_Roles.OWNER}
                                  control={<Radio />}
                                  label="I am an Owner"
                                />
                              </Tooltip>
                            </RadioGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    </MyGrid>

                    <MyGrid xs={6}>
                      <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#f5f5f5' }}>
                        <CardContent>
                          <FormControl component="fieldset">
                            <RadioGroup value={formData.userRoleId} onChange={handleRoleChange}>
                              <Tooltip title="As a tenant, you can browse and rent properties listed by owners.">
                                <FormControlLabel
                                  value={User_Roles.TENANT}
                                  control={<Radio />}
                                  label="I am a Tenant"
                                />
                              </Tooltip>
                            </RadioGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    </MyGrid>
                  </MyGrid>
                </Stack>

                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleAuthRegister}
                >
                  Sign Up
                </Button>
              </Box>
              <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Sign in
                </Typography>
              </Stack>
            </Card>
          </MyGrid>
        </MyGrid>
      </Box>
    </PageContainer>
  );
};

export default Register2;
