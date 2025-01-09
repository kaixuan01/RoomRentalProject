import React, { useRef, useState } from 'react';
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
import { InputFormat, User_Roles } from '../../utils/enum';
import { isStrongPassword } from '../../utils/helpers/passwordHelpers';
import { Person, AccountCircle, Email, Phone, Lock } from '@mui/icons-material';
import MyGrid from '../../components/container/MyGrid';
import MyInput from '../../components/input/MyInput';
import { useSelector } from 'react-redux';
import ValidationHandler from '../../components/input/ValidationHandler';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        userRoleId: User_Roles.TENANT,
        phone: '',
    });

    const registerValidGroup = "register";
    const regFormValidation = {
        name: { required: true, validateGroup: registerValidGroup },
        username: { required: true, validateGroup: registerValidGroup },
        password: { required: true, format: InputFormat.PASSWORD, validateGroup: registerValidGroup },
        confirmPassword: { required: true, format: InputFormat.CONFIRM_PASSWORD, validateGroup: registerValidGroup },
        email: { required: true, format: InputFormat.EMAIL, validateGroup: registerValidGroup },
        phone: { required: true, format: InputFormat.PHONE, validateGroup: registerValidGroup },
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAuthRegister = () => {
        console.log("Validation passed!");
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
                                    <MyInput
                                        {...regFormValidation.name}
                                        id="name"
                                        label="Name"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange(e)}
                                        icon={<Person />}
                                    />
                                </Stack>
                                <Stack mb={3}>
                                    <MyInput
                                        {...regFormValidation.username}
                                        id="username"
                                        label="Username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={(e) => { handleInputChange(e) }}
                                        icon={<Person />}
                                    />
                                </Stack>
                                <Stack mb={3}>
                                    <MyInput
                                        {...regFormValidation.password}
                                        id="password"
                                        label="Password"
                                        placeholder="••••••"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => { handleInputChange(e) }}
                                        icon={<Person />}
                                    />
                                </Stack>
                                <Stack mb={3}>
                                    <MyInput
                                        {...regFormValidation.confirmPassword}
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        placeholder="••••••"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => { handleInputChange(e) }}
                                        icon={<Lock />}
                                    />
                                </Stack>
                                <Stack mb={3}>
                                    <MyInput
                                        {...regFormValidation.email}
                                        id="email"
                                        label="Email"
                                        placeholder="example@email.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => { handleInputChange(e) }}
                                        icon={<Email />}
                                    />
                                </Stack>
                                <Stack mb={3}>
                                    <MyInput
                                        {...regFormValidation.phone}
                                        id="phone"
                                        label="Phone Number"
                                        placeholder="Your phone number"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => { handleInputChange(e) }}
                                        icon={<Phone />}
                                    />
                                </Stack>
                                <ValidationHandler
                                    formData={formData}
                                    regFormValidation={regFormValidation}
                                    validateGroup="register"
                                    onValidationComplete={(isValid) => {
                                        if (isValid) {
                                            handleAuthRegister();
                                        }
                                    }}
                                >
                                    {({ validate }) => (
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={validate}
                                        >
                                            Sign Up
                                        </Button>
                                    )}
                                </ValidationHandler>
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

export default UserRegister;
