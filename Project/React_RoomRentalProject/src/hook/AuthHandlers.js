import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/actions';
import { useFuncHTTPReq } from '../components/shared/FuncHttpReq';

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const { FuncHTTPReq } = useFuncHTTPReq();

  const handleLogin = useCallback(() => {
    dispatch(updateData('isLogin', 'Login'));
  }, [dispatch]);
  
  const handleLogout = useCallback(() => {
    dispatch(updateData('isLogin', null));
    localStorage.removeItem('isLogin');
    FuncHTTPReq({
      url: `/OAuth/Logout`,
      method: 'POST',
    });
    window.location.href = "/";
  }, [dispatch, FuncHTTPReq]);
  

  return { handleLogin, handleLogout };
};
