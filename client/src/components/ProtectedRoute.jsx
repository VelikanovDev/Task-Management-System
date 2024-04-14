import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
