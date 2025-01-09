import React from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../../Redux/actions";
import { InputFormat } from "../../utils/enum";

const ValidationHandler = ({ formData, regFormValidation, validateGroup, onValidationComplete, children }) => {
  const dispatch = useDispatch();

  const validate = () => {
    let isValid = true;
    const errors = {};

    for (const field in regFormValidation) {
      const rules = regFormValidation[field];

      if (rules.validateGroup !== validateGroup) {
        continue;
      }

      if (rules.required && (!formData[field] || (typeof formData[field] === "string" && formData[field].trim() === ""))) {
        console.log(formData[field]);
        errors[field] = `${field} is required.`;
        isValid = false;
      }

      if (rules.format === InputFormat.PASSWORD) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
        if (!passwordRegex.test(formData[field])) {
          errors[field] = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
          isValid = false;
        }
      } else if (rules.format === InputFormat.CONFIRM_PASSWORD) {
        const originalPassword = Object.entries(formData).find(
          ([key, value]) => regFormValidation[key]?.format === InputFormat.PASSWORD
        )?.[1];
        
        if (formData[field] !== originalPassword) {
          errors[field] = 'Passwords do not match.';
          isValid = false;
        }
      }


    }

    dispatch(updateData(validateGroup, errors));

    if (onValidationComplete) {
      onValidationComplete(isValid);
    }
  };
  return children({ validate });
};

export default ValidationHandler;
