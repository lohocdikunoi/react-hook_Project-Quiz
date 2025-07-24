import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/apiService";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  const { t } = useTranslation();
  const isAuthenticator = useSelector((state) => state.user.isAuthenticator);
  const account = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const HandleLogin = () => {
    navigate("/login");
  };

  const HandleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
      toast.success(res.EM);
    } else {
      toast.success(res.EM);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          {/* <Navbar.Brand href="#home">Trinh Kim Vien</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">
            Trinh Kim Vien
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t("Header.home")}
              </NavLink>
              <NavLink to="users" className="nav-link">
                {t("Header.users")}
              </NavLink>
              <NavLink to="admin" className="nav-link">
                {t("Header.admin")}
              </NavLink>
            </Nav>

            {!isAuthenticator ? (
              <>
                <button className="btn-login" onClick={() => HandleLogin()}>
                  {t("Header.login")}
                </button>
                <button
                  className="btn-signup"
                  onClick={() => navigate("/register")}
                >
                  {t("Header.register")}
                </button>
              </>
            ) : (
              <NavDropdown title={t("Header.Setting")} id="basic-nav-dropdown">
                {/* <NavDropdown.Item>Login</NavDropdown.Item> */}
                <NavDropdown.Item onClick={() => setShowProfile(true)}>
                  {t("Header.Profile")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => HandleLogOut()}>
                  {t("Header.Logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />

            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={showProfile} setShow={setShowProfile} />
    </>
  );
};

export default Header;
