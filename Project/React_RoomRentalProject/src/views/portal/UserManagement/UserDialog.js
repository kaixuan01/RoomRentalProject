import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User_Roles, User_Status } from 'src/utils/enum'; 
import { useUserService } from '../../../services/userService';
import { showSuccessAlert, showErrorAlert } from 'src/utils/helpers/alertHelpers';
import StyledDialog from '../../../components/shared/StyledDialog';
const UserDialog = ({ open, onClose, onSave, user }) => {
  const userService = useUserService();
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().when('$isEditing', {
      is: false,
      then: () => Yup.string().required('Password is required'),
      otherwise: () => Yup.string()
    }),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string(),
    role: Yup.number().required('Role is required'),
    status: Yup.number().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      role: 0, // Default to Tenant
      status: 0, // Default to Active
      isEmailVerified: false,
      isEditing: false,
    },
    validationSchema,
    validateOnMount: true,
    context: { isEditing: !!user },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const submitData = { ...values };
        delete submitData.isEditing;
        console.log(1)
        
        // Remove password if editing and password is empty
        if (values.isEditing && !values.password) {
          delete submitData.password;
        }

        let response;
        if (values.isEditing) {
          response = await userService.updateUser(submitData);
          await showSuccessAlert('Success', 'User updated successfully');
        } else {
          response = await userService.createUser(submitData);
          await showSuccessAlert('Success', 'User created successfully');
        }

        onSave(response);
        onClose();
      } catch (error) {
        await showErrorAlert(
          'Error',
          error.message || 'An error occurred while saving the user'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        ...user,
        password: '',
        isEditing: true,
      });
    } else {
      formik.resetForm();
    }
  }, [user]);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="role"
                label="Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                {Object.entries(User_Roles).map(([key, value]) => (
                  <MenuItem key={value} value={value}>{key}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                name="status"
                label="Status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                {Object.entries(User_Status).map(([key, value]) => (
                  <MenuItem key={value} value={value}>{key}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isEmailVerified"
                    checked={formik.values.isEmailVerified}
                    onChange={formik.handleChange}
                  />
                }
                label="Email Verified"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={onClose}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Saving...' : user ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default UserDialog;