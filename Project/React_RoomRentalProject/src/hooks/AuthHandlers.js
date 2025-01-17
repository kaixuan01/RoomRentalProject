import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/actions';
import { useHTTPReq } from './HttpReq';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userProfile');
    HTTPReq({
      url: `/OAuth/Logout`,
      method: 'POST',
    });
  }, []);

  const { HTTPReq } = useHTTPReq(handleLogout);

  const handleLogin = useCallback((userData) => {
    localStorage.setItem('isLogin', 'Login');
    localStorage.setItem('userProfile', JSON.stringify(userData));

  }, [dispatch]);

  return { handleLogin, handleLogout };
};
