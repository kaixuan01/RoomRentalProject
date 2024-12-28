import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/actions';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();

  const handleLogin = useCallback(() => {
    dispatch(updateData('isLogin', 'Login'));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(updateData('isLogin', null));
    localStorage.removeItem('isLogin');
    window.location.href = "/"; 
  }, [dispatch]);

  return { handleLogin, handleLogout };
};
