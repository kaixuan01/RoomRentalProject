import React from 'react';

const MyAlert = ({ color = 'primary', message }) => {
    return (
        <div className={`alert alert-${color}`} role="alert">
            {message}
        </div>
    );
};

export default MyAlert;
