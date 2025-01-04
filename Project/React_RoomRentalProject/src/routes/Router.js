import React, { lazy, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { initData } from '../Redux/actions';

/* ***Layouts**** */
const PortalLayout = Loadable(lazy(() => import('../layouts/full/PortalLayout')));
const MainLayout = Loadable(lazy(() => import('../layouts/full/MainLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Main Pages***** */
const AboutUsPage = Loadable(lazy(() => import('../views/MainPage/AboutUs/AboutUs')));

/* ****Auth Pages***** */
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/ForgotPassword/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ForgotPassword/ResetPassword')));
const EmailConfirmation = Loadable(lazy(() => import('../views/authentication/EmailConfirmation')));

/* ****Portal Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));


const Router = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLogin');
    dispatch(initData('isLogin', storedLoginStatus || null));
  }, [dispatch]);

  const routes = [
    // Main Page Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <SamplePage /> },
        { path: '/about', element: <AboutUsPage /> },
        // { path: '/contact', element: <ContactPage /> },
        // { path: '/listings', element: <ListingPage /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
    // Portal Routes (authenticated)
    ...(isLogin
      ? [
          {
            path: '/portal',
            element: <PortalLayout />,
            children: [
              { path: '/portal', element: <Navigate to="/portal/dashboard" replace /> },
              { path: '/portal/dashboard', element: <Dashboard /> },
              { path: '/portal/sample-page', element: <SamplePage /> },
              { path: '/portal/icons', element: <Icons /> },
              { path: '/portal/ui/typography', element: <TypographyPage /> },
              { path: '/portal/ui/shadow', element: <Shadow /> },
              { path: '*', element: <Navigate to="/portal/dashboard" replace /> },
            ],
          },
        ]
      : []),
    // Authentication Routes
    {
      path: '/auth',
      element: <BlankLayout />,
      children: [
        { path: '/auth', element: <Navigate to="/auth/login" replace /> },
        { path: '/auth/register', element: <Register /> },
        { path: '/auth/login', element: <Login /> },
        { path: '/auth/ConfirmEmail/:token', element: <EmailConfirmation /> },
        { path: '/auth/ResetPassword/:token', element: <ResetPassword /> },
        { path: '/auth/ForgotPassword', element: <ForgotPassword /> },
        { path: '*', element: <Navigate to="/auth/login" replace /> },
      ],
    },
  ];

  return routes;
};
export default Router;
