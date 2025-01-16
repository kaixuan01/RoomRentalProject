import { createSlice } from '@reduxjs/toolkit';

const validationSlice = createSlice({
    name: 'validation',
    initialState: {},
    reducers: {
        clearValidation: (state, action) => {
            const groupName = action.payload;
            if (state[groupName]) {
                delete state[groupName];
            }
        }
    }
});

export const { clearValidation } = validationSlice.actions;
export default validationSlice.reducer; 