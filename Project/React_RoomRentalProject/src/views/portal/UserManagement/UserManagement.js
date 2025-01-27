import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Toolbar,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconSearch,
  IconFilter,
  IconRefresh,
} from '@tabler/icons-react';
import { useUserService } from '../../../services/userService';
import UserDialog from './UserDialog';
import DeleteConfirmDialog from '../../../components/Dialog/DeleteConfirmDialog';
import { showSuccessAlert, showErrorAlert } from '../../../utils/helpers/alertHelpers';
import DataTable from '../../../components/DataTable';
import { getUserRoleLabel, getUserStatusLabel } from '../../../utils/enumHelpers';
import { User_Roles, User_Status } from '../../../utils/enum';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const userService = useUserService();

  const loadUsers = (param) => {
    setLoading(true);
    userService.getUsers({
      onSuccess: (data) => {
        setUsers(data);
        setLoading(false);
      },
      onError: (error) => {
        showErrorAlert(error);
        setLoading(false);
      },
    }, param);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleSave = (userData) => {
    if (selectedUser) {
      userService.updateUser(selectedUser.id, userData, {
        onSuccess: (data, msg) => {
          showSuccessAlert(msg);
          loadUsers();
          handleDialogClose();
        },
        onError: (error) => {
          showErrorAlert(error);
        },
      });
    } else {
      userService.createUser(userData, {
        onSuccess: (data, msg) => {
          showSuccessAlert(msg);
          loadUsers();
          handleDialogClose();
        },
        onError: (error) => {
          showErrorAlert(error);
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    userService.deleteUser(selectedUser.id, {
      onSuccess: (data, msg) => {
        showSuccessAlert(msg);
        loadUsers();
        handleDeleteDialogClose();
      },
      onError: (error) => {
        showErrorAlert(error);
      },
    });
  };
  // Define columns for the DataTable
  const columns = [
    { id: 'username', label: 'Username', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'phone', label: 'Phone', sortable: true },
    {
      id: 'role',
      label: 'Role',
      filterType: 'dropdown',
      options: Object.entries(User_Roles).map(([key, value]) => ({ value, label: key })),
      sortable: true,
      render: (user) => (
        <Chip label={getUserRoleLabel(user.role)} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      id: 'status',
      label: 'Status',
      filterType: 'dropdown',
      options: Object.entries(User_Status).map(([key, value]) => ({ value, label: key })),
      sortable: true,
      render: (user) => (
        <Chip
          label={getUserStatusLabel(user.status).label}
          color={getUserStatusLabel(user.status).color}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      sortable: false,
      render: (user) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(user)} color="primary" size="small">
              <IconEdit size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(user)} color="error" size="small">
              <IconTrash size={18} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Paper elevation={0} sx={{ mb: 2, p: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          User Management
        </Typography>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              onClick={handleAdd}
            >
              Add User
            </Button>
          </Box>
        </Toolbar>
      </Paper>

      <Paper elevation={0}>
        <DataTable
          data={users}
          columns={columns}
          onSearchChange={setSearchQuery}
          onRefresh={loadUsers}
          loading={loading}
          onQueryParamsChange={(param) => loadUsers(param)}
        />
      </Paper>

      <UserDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSave}
        user={selectedUser}
      />

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        content="Are you sure you want to delete this user? This action cannot be undone."
      />
    </Box>
  );
};

export default UserManagement;