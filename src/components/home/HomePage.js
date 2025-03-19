import VideoHomePage from "../../assets/home-page.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticator = useSelector((state) => state.user.isAuthenticator);
  return (
    <div className="home-page_container">
      <div className="Video-Content">
        <div className="Video">
          <video autoPlay muted loop>
            <source src={VideoHomePage} type="video/mp4"></source>
          </video>
        </div>
        <div className="Content">
          <h1 className="heading-lv1">Make forms worth filling out</h1>
          <p className="desc-content">
            Get more data—like signups, feedback, and anything else—with forms
            designed to be <span>refreshingly different.</span>
          </p>

          {isAuthenticator === false ? (
            <button onClick={() => navigate("/login")} className="btn-started">
              Get started—it's free
            </button>
          ) : (
            <button onClick={() => navigate("/users")} className="btn-started">
              Doing Quiz Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
