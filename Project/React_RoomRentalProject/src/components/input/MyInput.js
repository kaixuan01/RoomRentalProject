import React, { useEffect } from "react";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../Redux/actions";

const MyInput = ({ required, onChange, icon, inputProps, value, validateGroup, ...props }) => {
    const [error, setError] = React.useState('');
    const dispatch = useDispatch();
    const validateRedux = useSelector((state) => state[validateGroup]);
    
    // const validateRedux1 = useSelector((state) => console.log(state));

    // useEffect(() => {
    //     if (!validateRedux) {
    //         dispatch(updateData(validateGroup, {}));
    //     } else if (required && !(props.id in validateRedux)) {
    //         const errorMessage = 'This field is required';
    //         dispatch(updateData(validateGroup, {
    //             ...validateRedux,
    //             [props.id]: errorMessage,
    //         }));

    //     }
    // }, [validateRedux, validateGroup, dispatch, required, props.id]);

    const handleChange = (e) => {
        const newValue = e.target.value;

        if (onChange) {
            onChange(e);
            var errorMessage = '';
            if (required && !newValue) {
                errorMessage = 'This field is required';
            }
            setError(errorMessage);
            dispatch(updateData(validateGroup, {
                ...validateRedux,
                [props.id]: errorMessage,
            }));
        };
    }
    const isEmpty = (value) => {
        return value === null || value === undefined || value === '';
    };

    return (
        <CustomTextField
            fullWidth
            variant="outlined"
            label={props.label ? props.label : props.id}
            onChange={handleChange}
            value={value}
            error={(validateRedux && !isEmpty(validateRedux[props.id]))}
            helperText={validateRedux && validateRedux[props.id]}
            inputProps={inputProps}
            InputProps={{
                ...props.InputProps,
                startAdornment: icon ? (
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                ) : undefined,
            }}
            {...props}
        />
    );
};

export default MyInput;
