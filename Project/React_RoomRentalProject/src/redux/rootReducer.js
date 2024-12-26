import genericReducer from './genericReducer';

const rootReducer = (state = {}, action) => {
  return {
    ...state,
    ...genericReducer(state, action),
  };
};

export default rootReducer;
