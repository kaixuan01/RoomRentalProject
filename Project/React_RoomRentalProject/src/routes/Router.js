import React, { lazy, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { initData } from '../Redux/actions';
import OwnerLogin from 'src/views/authentication/OwnerLogin';
import { User_Roles } from '../utils/enum';
import TNCCategory from '../views/portal/TermAndCondition/TNCCategory';
/* ***Layouts**** */
const PortalLayout = Loadable(lazy(() => import('../layouts/full/PortalLayout')));
const MainLayout = Loadable(lazy(() => import('../layouts/full/MainLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Main Pages***** */
const MainHomePage = Loadable(lazy(() => import('../views/MainPage/Home/index')));
const AboutUsPage = Loadable(lazy(() => import('../views/MainPage/About/index')));
const ContactPage = Loadable(lazy(() => import('../views/MainPage/Contact/index')));
const PropertyListing = Loadable(lazy(() => import('../views/MainPage/Property/PropertyListing')));
const PropertyDetails = Loadable(lazy(() => import('../views/MainPage/Property/PropertyDetails')));

/* ****Auth Pages***** */
const UserRegister = Loadable(lazy(() => import('../views/authentication/OwnerRegister')));
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
const UserManagement = Loadable(lazy(() => import('../views/portal/UserManagement/UserManagement')));


const Router = () => {
  const isLogin = localStorage.getItem('isLogin') ?? false;
  const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
  const userRole = userProfile ? userProfile.userRoleId : null || -1;

  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Extract the current path

  const routes = [
    // Main Page Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <MainHomePage />,
        },
        { path: '/about-us', element: <AboutUsPage />},
        { path: '/contact-us', element: <ContactPage /> },
        { path: '/property-listing', element: <PropertyListing /> },
        { path: '/property-details/:id', element: <PropertyDetails /> },
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
              { path: '/portal/dashboard', element: <Dashboard />, accessible: [User_Roles.ADMIN, User_Roles.OWNER] },
              { path: '/portal/sample-page', element: <SamplePage />, accessible: [User_Roles.ADMIN, User_Roles.OWNER] },
              { path: '/portal/icons', element: <Icons />, accessible: [User_Roles.ADMIN, User_Roles.OWNER] },
              { path: '/portal/ui/typography', element: <TypographyPage />, accessible: [User_Roles.ADMIN, User_Roles.OWNER] },
              { path: '/portal/ui/shadow', element: <Shadow />, accessible: [User_Roles.ADMIN, User_Roles.OWNER] },
              { path: '/portal/user-management', element: <UserManagement />, accessible: [User_Roles.ADMIN] },
              { path: '/portal/tnc', element: <TNCCategory/>, accessible: [User_Roles.ADMIN] },
              { path: '*', element: <Navigate to="/" replace /> },
            ],
          },
        ]
      : []),
    // Authentication Routes  
    {
      path: '/auth',
      element: <BlankLayout />,
      children: [
        { path: '/auth', element: <Navigate to="/auth/ownerLogin" replace /> },
        { path: '/auth/ownerLogin', element: <OwnerLogin /> },
        { path: '/auth/ownerRegister', element: <UserRegister /> },
        { path: '/auth/ConfirmEmail/:token', element: <EmailConfirmation /> },
        { path: '/auth/ResetPassword/:token', element: <ResetPassword /> },
        { path: '/auth/ForgotPassword', element: <ForgotPassword /> },
        { path: '*', element: <Navigate to="/auth/ownerLogin" replace /> },
      ],
    },
  ];

  const renderRoutes = (routes, currentPath) => {
    return routes.map((route) => {
      const filteredRoutes = route.children
      ? route.children.filter(
          (childRoute) => !childRoute.accessible || childRoute.accessible.includes(userRole)
        )
      : [];

      // Return a new route object with updated children
      return {
        ...route,
        children: filteredRoutes,
      };
    });
  };

  var router123 = renderRoutes(routes, currentPath); // Pass the current path to renderRoutes
  return router123;
};
export default Router;
