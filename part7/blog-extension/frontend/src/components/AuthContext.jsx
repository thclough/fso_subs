import { Navigate } from "react-router-dom";

const AuthWrapper = (props) =>
  props.user === null ? <Navigate to="/login" replace /> : props.children;

export default AuthWrapper;
