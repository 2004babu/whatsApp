import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.authState.isAuthenticatedUser);

  return isAuthenticated ? children : Navigate({to:'/login'});
};

export default ProtectedRoute;
