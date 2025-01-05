import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AlertInfo = ({ severity = 'info', title = '', message }) => {
    return (
        <Alert severity={severity}>
            {/* {title && <AlertTitle>{title}</AlertTitle>} */}
            {message}
        </Alert>
    );
};

export default AlertInfo;
