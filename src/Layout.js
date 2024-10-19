import App from "./App";
import User from "./components/users/User";
import Admin from "./components/admin/Admin";
import HomePage from "./components/home/HomePage";
import Dashboard from "./components/admin/Content/Dashboard";
import ManageUser from "./components/admin/Content/ManageUser";
import Login from "./components/Auth/Login";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Register from "./components/Auth/Register";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="users" element={<User />}></Route>
        </Route>

        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/admin/manage-user" element={<ManageUser />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
};

export default Layout;
