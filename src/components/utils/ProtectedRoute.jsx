import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isActive, redirectPath }) => {
  if (!isActive) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;