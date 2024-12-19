import React, { useCallback, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';
import '../../CSS/Login.css';
import HTTPReq from '../../Control/HTTPReq';
import MyInputField from '../../Control/MyInputField';
import { useAuthHandlers } from '../../Hook/AuthHandlers';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { handleLogin } = useAuthHandlers();
    const successLogin = useCallback(() => {
        handleLogin();
    }, [handleLogin]);

    const handleSubmit = (sendRequest) => (e) => {
        e.preventDefault();
        sendRequest(); // Directly call sendRequest here
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
            <Card className="centered-card p-4 shadow-lg">
            <CardHeader className="text-center bg-white border-0">
                <h2 className="project-title">Welcome to PB</h2>
            </CardHeader>
            <HTTPReq
                    method="POST"
                    url={`/OAuth`}
                    credentials="include"
                    onSuccess={(result) => successLogin(result)}
                    data={{ username, password }}
                >
                    {({ sendRequest }) => (
                        <form onSubmit={handleSubmit(sendRequest)}>
                            <CardBody>
                                <div className="mb-3">
                                    <MyInputField
                                        className="login-input"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <MyInputField
                                        className="login-input"
                                        placeholder="Password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </CardBody>
                            <CardFooter className="bg-white border-0">
                                <div className="d-flex justify-content-center">
                                    <Button
                                        id="loginButton"
                                        color="success"
                                        className="px-4 py-2 w-100 rounded-pill"
                                        style={{ maxWidth: '300px' }}
                                    >
                                        Login
                                    </Button>
                                </div>
                                <div className='d-flex'>
                                    <Link to="Account/ForgotPassword" className="btn btn-link mt-4">
                                        Forgot Password
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    )}
                </HTTPReq>
            </Card>
        </div>
    );
}
