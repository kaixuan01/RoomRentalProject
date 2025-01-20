import { useHTTPReq } from '../hooks/HttpReq';
import { buildQueryString } from '../utils/helpers/stringHelper';

export const useUserService = () => {
  const { HTTPReq } = useHTTPReq();

  const getUsers = (callbacks = {}, param) => {
    return HTTPReq({
      url: `/User/GetUserList?${buildQueryString(param)}`,
      method: 'GET',
      onSuccess: (data) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const getUserById = (id, callbacks = {}) => {
    return HTTPReq({
      url: `/User/GetUser/${id}`,
      method: 'GET',
      onSuccess: (data) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const createUser = (userData, callbacks = {}) => {
    return HTTPReq({
      url: '/User/CreateUser',
      method: 'POST',
      data: userData,
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const updateUser = (id, userData, callbacks = {}) => {
    return HTTPReq({
      url: `/User/UpdateUser/${id}`,
      method: 'PUT',
      data: userData,
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  const deleteUser = (id, callbacks = {}) => {
    return HTTPReq({
      url: `/User/DeleteUser/${id}`,
      method: 'DELETE',
      onSuccess: (data, msg) => {
        if (callbacks.onSuccess) callbacks.onSuccess(data, msg);
      },
      onError: (error) => {
        if (callbacks.onError) callbacks.onError(error);
      },
    });
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}; 