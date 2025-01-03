import React, { useEffect, useState } from 'react';
import { useHTTPReq } from '../../hooks/HttpReq';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CircularProgress, Typography, Box } from '@mui/material';
import { showErrorAlert, showSuccessAlert } from '../../utils/helpers/alertHelpers';
import AlertInfo from '../../components/message/AlertInfo';

export default function EmailConfirmation() {
    const { HTTPReq } = useHTTPReq();
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        HTTPReq({
            url: `/OAuth/ConfirmEmail`,
            data: { token: token },
            method: 'POST',
            onSuccess: (data, msg) => {
                setSuccessMessage(msg);
                setLoading(false);
            },
            onError: (error) => {
                setError(`Failed to confirm email. ${error}`);
                setLoading(false);
            },
        });
    }, [HTTPReq, token]);

    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh" 
            bgcolor="#f5f5f5"
        >
            <Card 
                sx={{ 
                    width: 400, 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    textAlign: 'center' 
                }}
            >
                <CardHeader 
                    title="Email Confirmation" 
                    sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        py: 2,
                        textAlign: 'center',
                    }}
                />
                <CardContent>
                    {loading ? (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <CircularProgress color="primary" />
                            <Typography variant="body1" mt={2}>
                                Confirming your email...
                            </Typography>
                        </Box>
                    ) : error ? (
                        <AlertInfo 
                        severity="error" 
                        message={error} 
                    />
                    ) : (
                        <>
                        <AlertInfo 
                            severity="success" 
                            title="Success!" 
                            message={successMessage} 
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 4 }} 
                            onClick={handleRedirectToLogin}
                        >
                            Go to Login
                        </Button>
                        </>

                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
