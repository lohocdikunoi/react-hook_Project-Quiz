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
import ListQuiz from "./components/users/ListQuiz";
import DetailQuiz from "./components/users/DetailQuiz";
import ManageQuiz from "./components/admin/Content/Quiz/ManageQuiz";
import Questions from "./components/admin/Content/Questions/Questions";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PrivateAuth from "./PrivateRoute/PrivateAuth";
import { Suspense } from "react";

const NotFound = () => {
  return <div className="container ">Error: 404. Not Found.</div>;
};

const Layout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          ></Route>
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />}></Route>

        <Route
          path="admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />}></Route>
          <Route path="/admin/manage-user" element={<ManageUser />}></Route>
          <Route path="/admin/manage-quizzes" element={<ManageQuiz />}></Route>
          <Route path="/admin/manage-questions" element={<Questions />}></Route>
        </Route>

        <Route
          path="/login"
          element={
            <PrivateAuth>
              <Login />
            </PrivateAuth>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PrivateAuth>
              <Register />
            </PrivateAuth>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
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
    </Suspense>
  );
};

export default Layout;
