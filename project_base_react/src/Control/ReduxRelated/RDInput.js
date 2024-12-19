import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../Redux/actions';
import { Input, FormGroup, Label } from 'reactstrap';

const RDInput = ({ name, label, type = "text", placeholder = "", source, ...rest }) => {
    const dispatch = useDispatch();
    const value = useSelector((state) => state[source]?.[name] || "");
    const currentState = useSelector((state) => state[source]);
    
    const handleChange = (e) => {
      const newValue = e.target.value;

      const updatedState = { ...currentState, [name]: newValue };
      dispatch(updateData(source, updatedState));
    };
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </FormGroup>
  );
};

export default RDInput;
