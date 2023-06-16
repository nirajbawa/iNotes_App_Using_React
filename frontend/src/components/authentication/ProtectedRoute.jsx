import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem('token')) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
