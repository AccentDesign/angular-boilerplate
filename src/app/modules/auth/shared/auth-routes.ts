export const AuthRoutes = {
  base: 'auth',
  logIn: 'login',
  logOut: 'logout',
  register: 'register',
  forgotPassword: 'forgot-password',
  resetPassword: 'forgot-password/:token',
};

export const AuthPaths = {
    logIn: `/${AuthRoutes.base}/${AuthRoutes.logIn}`,
    logOut: `/${AuthRoutes.base}/${AuthRoutes.logOut}`,
    register: `/${AuthRoutes.base}/${AuthRoutes.register}`,
    forgotPassword: `/${AuthRoutes.base}/${AuthRoutes.forgotPassword}`,
    resetPassword: `/${AuthRoutes.base}/${AuthRoutes.resetPassword}`,
};
