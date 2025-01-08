import React from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../../Redux/actions";

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
        errors[field] = `${field} is required.`;
        isValid = false;
      }
    }

    // Dispatch the errors to Redux
    dispatch(updateData(validateGroup, errors));

    // Call callback with validation result
    if (onValidationComplete) {
      onValidationComplete(isValid);
    }
  };

  // Pass the `validate` function to the children
  return children({ validate });
};

export default ValidationHandler;
