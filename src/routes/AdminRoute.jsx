import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "admin") return children;

  return <Navigate to="/"></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
