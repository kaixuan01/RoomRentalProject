import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  InputAdornment
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Lock from '@mui/icons-material/Lock';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { showErrorAlert, showSuccessAlert } from '../../../utils/helpers/alertHelpers';
import { useHTTPReq } from '../../../hooks/HttpReq';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import MyGrid from '../../../components/container/MyGrid';
import { isStrongPassword } from '../../../utils/helpers/passwordHelpers';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { HTTPReq } = useHTTPReq();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !isStrongPassword(newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    HTTPReq({
      url: `/OAuth/ResetPassword`,
      data: { token, ...formData },
      method: 'POST',
      onSuccess: (data, result) => {
        showSuccessAlert(result).then(() => {
          navigate('/auth/login');
        });
      },
      onError: (error) => {
        showErrorAlert(error);
      }
    });
  };

  return (
    <PageContainer title="Reset Password" description="this is reset password page">
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
              <Typography variant="h5" textAlign="center" mb={1}>
                Reset Password
              </Typography>
              <Typography variant="body2" textAlign="center" color="textSecondary" mb={3}>
                Please enter your new password below
              </Typography>
              <Box>
                <Stack spacing={3} mb={3}>
                  <CustomTextField
                    fullWidth
                    required
                    id="newPassword"
                    label="New Password"
                    placeholder="••••••"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />

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
                </Stack>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Reset Password
                </Button>
              </Box>
            </Card>
          </MyGrid>
        </MyGrid>
      </Box>
    </PageContainer>
  );
}
