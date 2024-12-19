import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AnonymousRoute = ({ element: Element, ...rest }) => {
  const isLogin = useSelector((state) => state.isLogin);

  // If user is logged in, redirect to a protected route (e.g., /dashboard)
  return !isLogin || isLogin === 'NotLogin' ? (
    <Route {...rest} element={Element} />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default AnonymousRoute;
