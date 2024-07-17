export const AuthRoutes = {
  base: 'auth',
  logIn: 'login',
  logOut: 'logout',
  forgotPassword: 'forgot-password',
  resetPassword: 'forgot-password/:token',
};

export const AuthPaths = {
  logIn: `/${AuthRoutes.base}/${AuthRoutes.logIn}`,
  logOut: `/${AuthRoutes.base}/${AuthRoutes.logOut}`,
  forgotPassword: `/${AuthRoutes.base}/${AuthRoutes.forgotPassword}`,
  resetPassword: `/${AuthRoutes.base}/${AuthRoutes.resetPassword}`,
};
