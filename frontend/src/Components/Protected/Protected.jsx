import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [auth, navigate, location.pathname]);

  return auth?.isAuthenticated ? children : null;
};

export default Protected;
