import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
} from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { showErrorAlert, showSuccessAlert } from '../../../Common';
import { useFuncHTTPReq } from '../../../hooks/FuncHttpReq';
import { useAuthHandlers } from '../../../hooks/AuthHandlers';
const AuthLogin = ({ title, subtitle, subtext }) => {
    const { FuncHTTPReq } = useFuncHTTPReq();
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
        FuncHTTPReq({
            url: `/OAuth`,
            data: formData, 
            method: 'POST',
            onSuccess: (data, msg) => {
                handleLogin();
                showSuccessAlert("Login Success").then(() => {
                    navigate('/');
                });
            },
            onError: (error) => {
                showErrorAlert(error);
            },
        });
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

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
                        to="/ForgotPassword"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
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
            {subtitle}
        </>
    );
};

export default AuthLogin;
