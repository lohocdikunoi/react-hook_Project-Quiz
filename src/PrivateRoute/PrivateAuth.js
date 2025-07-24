import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateAuth = (props) => {
  const isAuthenticator = useSelector((state) => state.user.isAuthenticator);

  if (!isAuthenticator) {
    return <>{props.children}</>;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default PrivateAuth;
