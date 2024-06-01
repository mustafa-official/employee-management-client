import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
