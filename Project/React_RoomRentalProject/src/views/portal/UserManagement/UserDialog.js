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

const UserDialog = ({ open, onClose, onSave, user }) => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().when('isEditing', {
      is: false,
      then: Yup.string().required('Password is required'),
    }),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string(),
    userRoleId: Yup.number().required('Role is required'),
    status: Yup.number().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      phone: '',
      userRoleId: 2, // Default to Tenant
      status: 1, // Default to Active
      isEmailVerified: false,
      isEditing: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const submitData = { ...values };
      delete submitData.isEditing;
      if (values.isEditing && !values.password) {
        delete submitData.password;
      }
      onSave(submitData);
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                name="userRoleId"
                label="Role"
                value={formik.values.userRoleId}
                onChange={formik.handleChange}
                error={formik.touched.userRoleId && Boolean(formik.errors.userRoleId)}
                helperText={formik.touched.userRoleId && formik.errors.userRoleId}
              >
                <MenuItem value={0}>Admin</MenuItem>
                <MenuItem value={1}>Owner</MenuItem>
                <MenuItem value={2}>Tenant</MenuItem>
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
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={2}>Inactive</MenuItem>
                <MenuItem value={3}>Pending</MenuItem>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {user ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;