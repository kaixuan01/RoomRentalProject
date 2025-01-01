import React, { lazy, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { initData } from '../Redux/actions';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const EmailConfirmation = Loadable(lazy(() => import('../views/authentication/EmailConfirmation')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/ForgotPassword/ForgotPassword')));

const Router = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLogin');
    dispatch(initData('isLogin', storedLoginStatus || null));
  }, [dispatch]);

  const routes = isLogin
    ? [
        {
          path: '/',
          element: <FullLayout />,
          children: [
            { path: '/', element: <Navigate to="/dashboard" replace /> },
            { path: '/dashboard', exact: true, element: <Dashboard /> },
            { path: '/sample-page', exact: true, element: <SamplePage /> },
            { path: '/icons', exact: true, element: <Icons /> },
            { path: '/ui/typography', exact: true, element: <TypographyPage /> },
            { path: '/ui/shadow', exact: true, element: <Shadow /> },
            { path: '*', element: <Navigate to="/auth/404" replace /> },
          ],
        },
      ]
    : [
        {
          path: '/',
          element: <BlankLayout />,
          children: [
            { path: '/', element: <Login/> },
            { path: '404', element: <Error /> },
            { path: '/auth/register', element: <Register /> },
            { path: '/auth/login', element: <Login /> },
            { path: '/ConfirmEmail/:token', element: <EmailConfirmation /> },
            { path: '/ForgotPassword', element: <ForgotPassword /> },
            { path: '*', element: <Login/> },
            
          ],
        },
      ];

  return routes;
};
export default Router;
