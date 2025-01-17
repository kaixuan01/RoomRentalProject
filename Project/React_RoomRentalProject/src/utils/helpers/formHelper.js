import { useDispatch } from "react-redux";
import { updateData } from "../../Redux/actions";
import { InputFormat } from "../enum";

export const isObjectEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
};

export const areAllValuesEmpty = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Input must be an object');
    }
    return Object.values(obj).every(value => value === '');
};

// export const formValidation = (formData, regFormValidation, validateGroup) => {
//     const dispatch = useDispatch();
//     let isValid = true;
//     const errors = {};
//     for (const field in regFormValidation) {
//       const rules = regFormValidation[field];
      
//       if (rules.validateGroup !== validateGroup) {
//         continue;
//       }
  
//       if (rules.required && (!formData[field] || formData[field].trim() === "")) {
//         errors[field] = `${field} is required.`;
//         isValid = false;
//       }
//     }
//     dispatch(updateData(validateGroup, errors))
//     return isValid;
//   };

export const validateField = (value, rules) => {
  let error = '';

  // Required validation
  if (rules.required && (!value || (typeof value === "string" && value.trim() === ""))) {
    return `This field is required`;
  }

  // Format validations
  if (rules.format && value) {
    switch (rules.format) {
      case InputFormat.EMAIL:
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case InputFormat.PASSWORD:
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
        if (!passwordRegex.test(value)) {
          error = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        break;

      case InputFormat.PHONE:
        // Malaysian phone number format:
        // Mobile: 01x-xxxxxxx where x can be 0-9
        // Land line: 0x-xxxxxxx where x can be 2-9
        const phoneRegex = /^(01[0-9]-\d{7,8}|0[2-9]-\d{7,8})$/;
        
        // Remove any spaces from the input
        const cleanNumber = value.replace(/\s+/g, '');
        
        // Check if the number starts with proper Malaysian prefixes
        const validPrefix = /^(01[0-9]|0[2-9])/.test(cleanNumber);
        
        // Add hyphen if not present
        const formattedNumber = cleanNumber.replace(/^(\d{3})(\d+)$/, '$1-$2');
        
        if (!validPrefix) {
          error = 'Please enter a valid Malaysian phone number starting with 01x or 0x';
        } else if (!phoneRegex.test(formattedNumber)) {
          error = 'Please enter a valid Malaysian phone number format (e.g., 012-3456789 or 03-12345678)';
        }
        break;
    }
  }

  return error;
};