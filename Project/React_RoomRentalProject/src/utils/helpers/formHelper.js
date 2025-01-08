import { useDispatch } from "react-redux";
import { updateData } from "../../Redux/actions";

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