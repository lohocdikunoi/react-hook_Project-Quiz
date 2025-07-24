import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";

import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import "./SideBar.scss";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const SideBar = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Trinh Kim Vien
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              {t("SideBar.Dashboard")}
              <Link to="/admin" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title={t("SideBar.title")}>
              <MenuItem>
                {t("SideBar.Features.user")}
                <Link to="/admin/manage-user" />
              </MenuItem>
              <MenuItem>
                {" "}
                {t("SideBar.Features.quiz")}
                <Link to="/admin/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                {" "}
                {t("SideBar.Features.question")}
                <Link to="/admin/manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/lohocdikunoi"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; Trinh Kim Vien
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
