import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/actions';
import { useHTTPReq } from './HttpReq';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const { HTTPReq } = useHTTPReq();

  const handleLogin = useCallback((userData) => {
    dispatch(updateData('isLogin', 'Login'));
    localStorage.setItem('isLogin', 'Login');

    // Update user profile
    dispatch(updateData('userProfile', userData));
    localStorage.setItem('userProfile', JSON.stringify(userData));

    window.location.href = "/portal";
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(updateData('isLogin', null));
    localStorage.removeItem('isLogin');

    // Clear user profile
    dispatch(updateData('userProfile', null));
    localStorage.removeItem('userProfile');
    HTTPReq({
      url: `/OAuth/Logout`,
      method: 'POST',
    });
    window.location.href = "/auth/login";
  }, [dispatch, HTTPReq]);

  return { handleLogin, handleLogout };
};
