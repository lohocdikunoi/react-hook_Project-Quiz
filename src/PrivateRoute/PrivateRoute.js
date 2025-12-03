import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthenticator = useSelector((state) => state.user.isAuthenticator);
  if (!isAuthenticator) {
    return <Navigate to={"/login"}></Navigate>;
  } else {
    return <>{props.children}</>;
  }
};

export default PrivateRoute;
