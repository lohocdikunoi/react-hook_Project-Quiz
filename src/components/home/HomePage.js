import VideoHomePage from "../../assets/home-page.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticator = useSelector((state) => state.user.isAuthenticator);
  const { t } = useTranslation();

  return (
    <div className="home-page_container">
      <div className="Video-Content">
        <div className="Video">
          <video autoPlay muted loop>
            <source src={VideoHomePage} type="video/mp4"></source>
          </video>
        </div>
        <div className="Content">
          <h1 className="heading-lv1">{t("HomePage.heading_lv1")}</h1>
          <p className="desc-content">{t("HomePage.desc_content")}</p>

          {isAuthenticator === false ? (
            <button onClick={() => navigate("/login")} className="btn-started">
              {t("HomePage.login")}
            </button>
          ) : (
            <button onClick={() => navigate("/users")} className="btn-started">
              {t("HomePage.users")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
