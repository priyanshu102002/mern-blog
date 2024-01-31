import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

// useNavigate is a hook that allows us to programmatically navigate to a different route
// Navigate is a component 
// currentUser means that if the user is logged in, then they can access the private route