import React, { useCallback, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Alert} from 'reactstrap';
import '../../CSS/Login.css'; // Ensure you have the necessary styles here.
import { showSuccessAlert } from '../../Common/Common';
import HTTPReq from '../../Control/HTTPReq';
import MyInputField from '../../Control/MyInputField';
import { useParams } from 'react-router-dom';

export default function Login() {

    const { token } = useParams();
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const successReset = useCallback((result) => {
        showSuccessAlert('Reset Password Succesful', result.message,
        () => {
            window.location.href = "/"; 
        });
    });
    
    const handleSubmit = (sendRequest) => {
        if (!newPassword || !confirmPassword) {
            setErrorMessage('Please enter both password fields.');
        } else if (newPassword.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
        } else if (!/[A-Z]/.test(newPassword)) {
            setErrorMessage('Password must contain at least one uppercase letter.');
        } else if (!/[a-z]/.test(newPassword)) {
            setErrorMessage('Password must contain at least one lowercase letter.');
        } else if (!/[0-9]/.test(newPassword)) {
            setErrorMessage('Password must contain at least one digit.');
        } else if (!/[@$!%*?&]/.test(newPassword)) {
            setErrorMessage('Password must contain at least one special character.');
        } else if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
        } else {
            setErrorMessage(''); // Clear any previous error message
            sendRequest();
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
            <Card className="centered-card p-4 shadow-lg">
            <CardHeader className="text-center bg-white border-0">
                <h2 className="project-title">Reset Password</h2>
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
                            placeholder='Password'
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <MyInputField
                        className="login-input" 
                            placeholder='Confirm Password'
                            type="password" 
                            onChange={(e) => setconfirmPassword(e.target.value)} 
                        />
                    </div>
                </CardBody>
                <CardFooter className="bg-white border-0">
                    <div className="d-flex justify-content-center">
                        <HTTPReq
                            method="POST"
                            url={`/OAuth/ResetPassword`}
                            credentials='include'
                            onSuccess={(data, result) => successReset(result)}
                            data={{ token, newPassword, confirmPassword }}
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
                </CardFooter>
            </Card>
        </div>
    );
}
