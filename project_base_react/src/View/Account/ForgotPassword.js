import React, {useCallback, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Alert } from 'reactstrap';
import '../../CSS/Login.css'; // Ensure you have the necessary styles here.
import HTTPReq from '../../Control/HTTPReq';
import MyInputField from '../../Control/MyInputField';
import { Link } from 'react-router-dom';
import { showSuccessAlert } from '../../Common/Common';

export default function Login() {

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (sendRequest) => {
        if (!email) {
            setErrorMessage('Please enter your email address.');
        } else if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
        } else {
            setErrorMessage(''); // Clear any previous error message
            sendRequest();
        }
    };

    const successRequest = useCallback((message) => {
        showSuccessAlert(message);
    });


    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
            <Card className="centered-card p-4 shadow-lg">
            <CardHeader className="text-center bg-white border-0">
                <h2 className="project-title">Forgot Password</h2>
                {errorMessage && (
                        <Alert color="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}
            </CardHeader>
                <CardBody>
                    <div className="mb-3">
                        <MyInputField 
                            className="login-input"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                    </div>
                </CardBody>
                <CardFooter className="bg-white border-0">
                    <div className="d-flex justify-content-center">
                        <HTTPReq
                            method="POST"
                            url={`/OAuth/ForgotPassword`}
                            credentials='include'
                            onSuccess={(data, message) => successRequest(message)}
                            data={{ email }}
                        >
                            {({ sendRequest }) => (
                                <Button 
                                    onClick={() => handleSubmit(sendRequest)} 
                                    color="success" 
                                    className="px-4 py-2 w-100 rounded-pill"
                                    style={{ maxWidth: '300px' }}
                                >
                                    Submit
                                </Button>
                            )}
                        </HTTPReq>
                    </div>
                    <div className='d-flex'>
                        <Link to="/Login" className="btn btn-link mt-4">
                            Back to Login
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
