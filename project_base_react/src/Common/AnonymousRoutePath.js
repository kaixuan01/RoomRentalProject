// AnonymousRoutePath.js
import EmailConfirmation from "../View/Account/EmailConfirmation.js";
import ResetPassword from "../View/Account/ResetPassword.js";
import ForgotPassword from "../View/Account/ForgotPassword.js";

const AnonymousRoutePath = [
  {
    path: '/ConfirmEmail/:id',
    name: 'EmailConfirmation',
    component: <EmailConfirmation />,
  },
  {
    path: '/Account/ForgotPassword',
    name: 'ForgotPassword',
    component: <ForgotPassword />,
  },
  {
    path: '/Account/ResetPassword/:token',
    name: 'ResetPassword',
    component: <ResetPassword />,
  }
];

export default AnonymousRoutePath;