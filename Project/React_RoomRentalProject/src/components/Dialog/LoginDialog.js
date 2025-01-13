import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Typography,
    Tabs,
    Tab,
    Box,
} from '@mui/material';
import { useHTTPReq } from '../../hooks/HttpReq';
import { useAuthHandlers } from '../../hooks/AuthHandlers';
import { showErrorAlert, showSuccessAlert } from '../../utils/helpers/alertHelpers';
import { User_Roles } from '../../utils/enum';
import MyInput from '../input/MyInput';
import ValidationHandler from '../input/ValidationHandler';
import { InputFormat } from '../../utils/enum';
import { Link } from 'react-router-dom';

const LoginDialog = ({ open, onClose, onLoginSuccess }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [registerData, setRegisterData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        userRoleId: User_Roles.TENANT,
        phone: '',
    });

    const { HTTPReq } = useHTTPReq();
    const { handleLogin } = useAuthHandlers();

    const registerValidGroup = "register";
    const regFormValidation = {
        name: { required: true, validateGroup: registerValidGroup },
        username: { required: true, validateGroup: registerValidGroup },
        password: { required: true, format: InputFormat.PASSWORD, validateGroup: registerValidGroup },
        confirmPassword: { required: true, format: InputFormat.CONFIRM_PASSWORD, validateGroup: registerValidGroup },
        email: { required: true, format: InputFormat.EMAIL, validateGroup: registerValidGroup },
        phone: { required: true, format: InputFormat.PHONE, validateGroup: registerValidGroup },
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleLoginInputChange = (e) => {
        const { id, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleRegisterInputChange = (e) => {
        const { id, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        HTTPReq({
            url: `/OAuth`,
            data: loginData,
            method: 'POST',
            onSuccess: (data) => {
                handleLogin(data);
                onLoginSuccess();
            },
            onError: (error) => {
                showErrorAlert(error);
            },
        });
    };

    const handleRegisterSubmit = () => {
        HTTPReq({
            url: `/OAuth/RegisterAcc`,
            data: registerData,
            method: 'POST',
            onSuccess: (data, msg) => {
                showSuccessAlert(msg);
                setActiveTab(0); // Switch back to login tab
            },
            onError: (error) => {
                showErrorAlert(error);
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab label="Login" />
                    <Tab label="Register as Tenant" />
                </Tabs>
            </DialogTitle>
            <DialogContent>
                {activeTab === 0 ? (
                    // Login Form
                    <form onSubmit={handleLoginSubmit}>
                        <Stack spacing={3} sx={{ mt: 2 }}>
                            <TextField
                                id="username"
                                label="Username"
                                fullWidth
                                value={loginData.username}
                                onChange={handleLoginInputChange}
                                required
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                                required
                            />
                            <Button type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                            <Typography 
                                variant="body2" 
                                align="center" 
                                sx={{ mt: 2 }}
                            >
                                Are you a property owner?{' '}
                                <Link 
                                    to="/auth/ownerLogin"
                                    onClick={onClose}
                                    style={{ 
                                        color: 'primary.main',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Login here
                                </Link>
                            </Typography>
                        </Stack>
                    </form>
                ) : (
                    // Register Form (Tenant Only)
                    <Box sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            <MyInput
                                {...regFormValidation.name}
                                id="name"
                                label="Name"
                                value={registerData.name}
                                onChange={handleRegisterInputChange}
                            />
                            <MyInput
                                {...regFormValidation.username}
                                id="username"
                                label="Username"
                                value={registerData.username}
                                onChange={handleRegisterInputChange}
                            />
                            <Stack direction="row" spacing={2}>
                                <MyInput
                                    {...regFormValidation.password}
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={registerData.password}
                                    onChange={handleRegisterInputChange}
                                    fullWidth
                                />
                                <MyInput
                                    {...regFormValidation.confirmPassword}
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterInputChange}
                                    fullWidth
                                />
                            </Stack>
                            <MyInput
                                {...regFormValidation.email}
                                id="email"
                                label="Email"
                                type="email"
                                value={registerData.email}
                                onChange={handleRegisterInputChange}
                            />
                            <MyInput
                                {...regFormValidation.phone}
                                id="phone"
                                label="Phone"
                                value={registerData.phone}
                                onChange={handleRegisterInputChange}
                            />
                            <ValidationHandler
                                formData={registerData}
                                regFormValidation={regFormValidation}
                                validateGroup={registerValidGroup}
                                onValidationComplete={(isValid) => {
                                    if (isValid) {
                                        handleRegisterSubmit();
                                    }
                                }}
                            >
                                {({ validate }) => (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={validate}
                                    >
                                        Register as Tenant
                                    </Button>
                                )}
                            </ValidationHandler>
                        </Stack>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;