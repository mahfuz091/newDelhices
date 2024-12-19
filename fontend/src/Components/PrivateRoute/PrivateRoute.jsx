import React from "react";
import { useRootContext } from "../../Provider/Context";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useRootContext();
  console.log(user, "Pr");

  const navigate = useNavigate();
  if (user && user?.isAdmin !== true) {
    navigate("/");
  }
  return children;
};

export default PrivateRoute;
