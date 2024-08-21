import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthGuard = ({ children }) => {
  const authToken = Cookies.get('result');
  const isAuthenticated = !!authToken;

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default AuthGuard;
