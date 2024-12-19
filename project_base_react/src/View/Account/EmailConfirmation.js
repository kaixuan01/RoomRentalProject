import React, { useEffect, useState } from 'react';
import { useFuncHTTPReq } from '../../Hook/FuncHttpReq';
import { useParams, useNavigate } from 'react-router-dom'; // import useNavigate
import { Card, CardBody, CardHeader, Spinner, Button } from 'reactstrap';
import MyAlert from '../../Control/MyAlert';

export default function EmailConfirmation() {
    const { FuncHTTPReq } = useFuncHTTPReq();
    const { id } = useParams();
    const navigate = useNavigate(); // initialize useNavigate
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        FuncHTTPReq({
            url: `/OAuth/ConfirmEmail`,
            data: {token: id},
            method: 'POST',
            onSuccess: (data, msg) => {
                setSuccessMessage(msg);
                setLoading(false);
            },
            onError: (error) => {
                setError(`Failed to confirm email. ${error}`);
                setLoading(false);
            }
        });
    }, [id, FuncHTTPReq]);

    // Redirect to login handler
    const handleRedirectToLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Card className="shadow-lg" style={{ width: '30rem' }}>
                <CardHeader className="bg-primary text-white text-center">
                    Email Confirmation
                </CardHeader>
                <CardBody className="text-center">
                    {loading ? (
                        <>
                            <Spinner color="primary" />
                            <p className="mt-3">Confirming your email...</p>
                        </>
                    ) : error ? (
                        <MyAlert color="danger" message={error} />
                    ) : (
                        <>
                            <MyAlert color="success" message={successMessage} />
                            <Button color="primary" className="mt-4" onClick={handleRedirectToLogin}>
                                Go to Login
                            </Button>
                        </>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
