import React from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../../Redux/actions";
import { InputFormat } from "../../utils/enum";
import { validateField } from "../../utils/helpers/formHelper";

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

      const errorMessage = validateField(formData[field], rules);
      if (errorMessage) {
        errors[field] = errorMessage;
        isValid = false;
      }

      // Special case for confirm password
      if (rules.format === InputFormat.CONFIRM_PASSWORD) {
        const originalPassword = Object.entries(formData).find(
          ([key, value]) => regFormValidation[key]?.format === InputFormat.PASSWORD
        )?.[1];
        
        if (formData[field] !== originalPassword) {
          errors[field] = 'Passwords do not match';
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
