import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/actions';

export const useAuthHandlers = () => {

  const handleLogout = async () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userProfile');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/OAuth/Logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies if needed
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Optionally handle any response data
      const data = await response.json();
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally dispatch an error action
      dispatch(updateData('logoutError', error.message));
    }
  };

  const handleLogin = (userData) => {
    localStorage.setItem('isLogin', 'Login');
    localStorage.setItem('userProfile', JSON.stringify(userData));
  };

  return { handleLogin, handleLogout };
};
