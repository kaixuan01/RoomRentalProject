import { INIT_DATA, UPDATE_DATA, DELETE_DATA, SET_ERROR } from './actionsTypes';

export const initData = (entity, data) => ({
  type: INIT_DATA,
  payload: { entity, data },
});

export const updateData = (entity, data) => ({
  type: UPDATE_DATA,
  payload: { entity, data },
});

export const deleteData = (entity, id) => ({
  type: DELETE_DATA,
  payload: { entity, id },
});

export const setError = (entity, error) => ({
  type: SET_ERROR,
  payload: { entity, error },
});
