import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminRoute = (props) => {
  const isRole = useSelector((state) => state.user.data.role);

  if (isRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    toast.error("ADMIN-Only Feature");
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
