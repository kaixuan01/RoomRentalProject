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
  Chip,
  IconButton,
  Typography,
} from '@mui/material';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useUserService } from '../../../services/userService';
import UserDialog from './UserDialog';
import DeleteConfirmDialog from '../../../components/Dialog/DeleteConfirmDialog';
import { showSuccessAlert, showErrorAlert } from '../../../utils/helpers/alertHelpers';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const userService = useUserService();

  const loadUsers = () => {
    userService.getUsers({
      onSuccess: (data) => {
        console.log(data);
        setUsers(data.items);
      },
      onError: (error) => {
        showErrorAlert(error);
      },
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const getUserRoleLabel = (roleId) => {
    switch (roleId) {
      case 0: return 'Admin';
      case 1: return 'Owner';
      case 2: return 'Tenant';
      default: return 'Unknown';
    }
  };

  const getUserStatusLabel = (status) => {
    switch (status) {
      case 0: return { label: 'Active', color: 'success' };
      case 1: return { label: 'Inactive', color: 'error' };
      case 2: return { label: 'Blocked', color: 'warning' };
      default: return { label: 'Unknown', color: 'default' };
    }
  };

  return (
    <Box>
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">User Management</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IconPlus />}
              onClick={handleAdd}
            >
              Add User
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{getUserRoleLabel(user.role)}</TableCell>
                      <TableCell>
                        <Chip
                          label={getUserStatusLabel(user.status).label}
                          color={getUserStatusLabel(user.status).color}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(user)} color="primary">
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(user)} color="error">
                          <IconTrash size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>

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