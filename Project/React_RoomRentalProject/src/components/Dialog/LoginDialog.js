import React, { useState, useEffect } from 'react';
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
    IconButton,
    InputAdornment,
    styled,
    Divider,
    alpha,
} from '@mui/material';
import { useHTTPReq } from '../../hooks/HttpReq';
import { useAuthHandlers } from '../../hooks/AuthHandlers';
import { showErrorAlert, showSuccessAlert } from '../../utils/helpers/alertHelpers';
import { User_Roles } from '../../utils/enum';
import MyInput from '../input/MyInput';
import ValidationHandler from '../input/ValidationHandler';
import { InputFormat } from '../../utils/enum';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch } from 'react-redux';
import { updateData } from '../../Redux/actions';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        padding: theme.spacing(2),
    },
    zIndex: 50,
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    minHeight: 48,
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
        },
    },
}));

const LoginDialog = ({ open, onClose, onLoginSuccess, defaultTab = 0 }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [showPassword, setShowPassword] = useState(false);
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

    const registerValidGroup = "tenantRegister";
    const regFormValidation = {
        name: { required: true, validateGroup: registerValidGroup },
        username: { required: true, validateGroup: registerValidGroup },
        password: { required: true, format: InputFormat.PASSWORD, validateGroup: registerValidGroup },
        confirmPassword: { required: true, format: InputFormat.CONFIRM_PASSWORD, validateGroup: registerValidGroup },
        email: { required: true, format: InputFormat.EMAIL, validateGroup: registerValidGroup },
        phone: { required: true, format: InputFormat.PHONE, validateGroup: registerValidGroup },
    };

    useEffect(() => {
        return () => {
            dispatch(updateData(registerValidGroup, {}));
        };
    }, []);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

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
                setActiveTab(0);
            },
            onError: (error) => {
                showErrorAlert(error);
            },
        });
    };

    return (
        <StyledDialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
        >
            <Box sx={{ position: 'relative' }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: -12,
                        top: -12,
                        color: 'text.secondary',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle sx={{ pb: 0 }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={(e, newValue) => setActiveTab(newValue)} 
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                height: 3,
                                borderRadius: '2px',
                            },
                        }}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </DialogTitle>

                <DialogContent>
                    {activeTab === 0 ? (
                        // Login Form
                        <form onSubmit={handleLoginSubmit}>
                            <Stack spacing={3} sx={{ mt: 3 }}>
                                <StyledInput
                                    id="username"
                                    label="Username"
                                    fullWidth
                                    value={loginData.username}
                                    onChange={handleLoginInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <StyledInput
                                    id="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    value={loginData.password}
                                    onChange={handleLoginInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    fullWidth
                                    size="large"
                                    sx={{ 
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                    }}
                                >
                                    Sign in
                                </Button>

                                <Divider>
                                    <Typography variant="body2" color="text.secondary">
                                        or
                                    </Typography>
                                </Divider>

                                <Typography 
                                    variant="body2" 
                                    align="center"
                                >
                                    Are you a property owner?{' '}
                                    <Link 
                                        to="/auth/ownerLogin"
                                        onClick={onClose}
                                        style={{ 
                                            color: 'primary',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Login here
                                    </Link>
                                </Typography>
                            </Stack>
                        </form>
                    ) : (
                        // Register Form
                        <Box sx={{ mt: 3 }}>
                            <Stack spacing={2.5}>
                                <MyInput
                                    {...regFormValidation.name}
                                    id="name"
                                    label="Name"
                                    value={registerData.name}
                                    onChange={handleRegisterInputChange}
                                    icon={<PersonOutlineIcon />}
                                />
                                <MyInput
                                    {...regFormValidation.username}
                                    id="username"
                                    label="Username"
                                    value={registerData.username}
                                    onChange={handleRegisterInputChange}
                                    icon={<PersonOutlineIcon />}
                                />
                                <Stack direction="row" spacing={2}>
                                    <MyInput
                                        {...regFormValidation.password}
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={registerData.password}
                                        onChange={handleRegisterInputChange}
                                        icon={<LockOutlinedIcon />}
                                        fullWidth
                                    />
                                    <MyInput
                                        {...regFormValidation.confirmPassword}
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        value={registerData.confirmPassword}
                                        onChange={handleRegisterInputChange}
                                        icon={<LockOutlinedIcon />}
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
                                    icon={<EmailIcon />}
                                />
                                <MyInput
                                    {...regFormValidation.phone}
                                    id="phone"
                                    label="Phone"
                                    value={registerData.phone}
                                    onChange={handleRegisterInputChange}
                                    icon={<PhoneIcon />}
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
                                            size="large"
                                            onClick={validate}
                                            sx={{ 
                                                mt: 2,
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                            }}
                                        >
                                            Create Tenant Account
                                        </Button>
                                    )}
                                </ValidationHandler>

                                <Divider sx={{ my: 2 }}>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: 'text.secondary',
                                            px: 2,
                                        }}
                                    >
                                        or
                                    </Typography>
                                </Divider>

                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 2,
                                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                                        border: '1px dashed',
                                        borderColor: 'primary.main',
                                    }}
                                >
                                    <Typography 
                                        variant="subtitle1" 
                                        align="center"
                                        color="primary"
                                        gutterBottom
                                    >
                                        Want to list your property?
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        align="center"
                                        color="text.secondary"
                                        mb={2}
                                    >
                                        Register as a property owner to start listing your properties
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/auth/ownerRegister"
                                        onClick={onClose}
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        sx={{ 
                                            borderRadius: '8px',
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Register as Owner
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    )}
                </DialogContent>
            </Box>
        </StyledDialog>
    );
};

export default LoginDialog;