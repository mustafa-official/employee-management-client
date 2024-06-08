import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";

const HrRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "hr") return children;
  return <Navigate to="/"></Navigate>;
};

HrRoute.propTypes = {
  children: PropTypes.node,
};
export default HrRoute;
