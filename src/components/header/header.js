import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const data = useSelector((state) => state.user.data);
  const isAuthenticator = useSelector((state) => state.user.isAuthenticator);
  console.log(">>> Check data: ", data);
  console.log(">>> Check isAuthenticator: ", isAuthenticator);
  const navigate = useNavigate();
  const HandleLogin = () => {
    navigate("/login");
  };

  return (
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
              Home
            </NavLink>
            <NavLink to="users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>

          {!isAuthenticator ? (
            <>
              <button className="btn-login" onClick={() => HandleLogin()}>
                Log in
              </button>
              <button
                className="btn-signup"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </>
          ) : (
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              {/* <NavDropdown.Item>Login</NavDropdown.Item> */}
              <NavDropdown.Item>Log out</NavDropdown.Item>
            </NavDropdown>
          )}

          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
