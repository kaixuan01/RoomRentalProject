import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/actions';
import { useHTTPReq } from './HttpReq';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const { HTTPReq } = useHTTPReq();

  const handleLogin = useCallback(() => {
    dispatch(updateData('isLogin', 'Login'));
    localStorage.setItem('isLogin', 'Login');
    window.location.href = "/portal";
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(updateData('isLogin', null));
    localStorage.removeItem('isLogin');
    HTTPReq({
      url: `/OAuth/Logout`,
      method: 'POST',
    });
    window.location.href = "/auth/login";
  }, [dispatch, FuncHTTPReq]);

  return { handleLogin, handleLogout };
};
