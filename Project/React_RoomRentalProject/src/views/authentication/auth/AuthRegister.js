import React, { useState } from 'react';
import { Box, Typography, Button, Grid2, Card, CardContent, FormControl, RadioGroup, FormControlLabel, Radio, Tooltip, InputAdornment  } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useFuncHTTPReq } from '../../../hooks/FuncHttpReq';
import { showErrorAlert, showSuccessAlert } from '../../../Common';
import { User_Roles } from "../../../utils/enum";
import { isStrongPassword } from "../../../utils/helpers/passwordHelpers";
import { Person, AccountCircle, Email, Phone, Lock } from '@mui/icons-material';  // Importing icons

const AuthRegister = ({ title, subtitle, subtext }) => {

    const { FuncHTTPReq } = useFuncHTTPReq();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        userRoleId: User_Roles.TENANT,
        phone: ''
    });

    const handleRoleChange = (event) => {

        setFormData(prevFormData => ({
            ...prevFormData,  // Spread the previous form data
            userRoleId: event.target.value  // Update only the userRoleId field
        }));

    };

    // Handle input change
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: "", // Clear error when user types
        }));
    };

    // Handle form validation
    const validateForm = () => {
        const newErrors = {};

        // Check for empty fields
        for (const key in formData) {
            if (!formData[key]) {
                newErrors[key] = "This field is required.";
            }
        }

        // Check password strength
        if (formData.password && !isStrongPassword(formData.password)) {
            newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
        }else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleAuthRegister = () => {

        if(!validateForm()){
            return; // Stop submission if validation fails
        }

        FuncHTTPReq({
            url: `/OAuth/RegisterAcc`,
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

    return(
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <CustomTextField id="name" variant="outlined" fullWidth 
                    required
                    value={formData.name}
                    label="Name"
                    placeholder="Your full name"
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ mt: "10px" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />

                <CustomTextField id="username" variant="outlined" fullWidth
                    required
                    label="Username"
                    value={formData.username}
                    placeholder="Username"
                    onChange={handleInputChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ mt: "10px" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />

                
                <Grid2 container spacing={2} mt="10px" >
                    <Grid2 size={6}>
                        
                        <CustomTextField fullWidth
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
                    </Grid2>

                    <Grid2 size={6}>
                        <CustomTextField fullWidth
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
                    </Grid2>
                </Grid2>

                <CustomTextField id="email" variant="outlined" fullWidth 
                    required
                    value={formData.email}
                    label="Email Address"
                    placeholder="your@email.com"
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mt: "10px" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />

                <CustomTextField id="phone" variant="outlined" fullWidth
                    required 
                    label= "Phone No."
                    value={formData.phone}
                    placeholder="0123456789"
                    onChange={handleInputChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    color={errors.phone ? 'error' : 'primary'}
                    sx={{ mt: "10px" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Container for the selection cards */}
                <Grid2 container spacing={2} mt="10px" >
                    <Grid2 size={6}>
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
                    </Grid2>

                    <Grid2 size={6}>
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
                    </Grid2>
                </Grid2>
            </Stack>

            <Button color="primary" variant="contained" size="large" fullWidth onClick={handleAuthRegister}>
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
    );
    
};

export default AuthRegister;
