import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/header";
import PerfectScrollbar from "react-perfect-scrollbar";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidebar-container"></div>
      </div>
      <div className="app-content">
        <PerfectScrollbar>
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default App;
