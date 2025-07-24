import { useState, useTransition } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Language from "../header/Language";
import { useTranslation, Trans } from "react-i18next";

const Login = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const HandleSubmitLogin = async () => {
    let isValidateEmail = validateEmail(email);

    if (!isValidateEmail) {
      toast.error("Validate Email");
      return;
    }

    if (!password) {
      toast.error("Validate Password");
      return;
    }
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const HandleSigin = () => {
    navigate("/register");
  };

  const HandleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      HandleSubmitLogin();
    }
  };

  return (
    <div className="Login-container">
      <div className="header">
        <span>{t("Login.header")}</span>
        <button onClick={() => HandleSigin()}>{t("Login.signin")}</button>
        <Language />
      </div>
      <div className="content">
        <div className="title col-4 mx-auto">Trinh Kim Vien</div>
        <div className="welcome col-4 mx-auto">{t("Login.welcome")}</div>
        <div className="form">
          <div className="form-group col-4 mx-auto">
            <label>Email</label>
            <input
              onKeyDown={(event) => HandleKeyDown(event)}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              type="email"
              className="form-control"
            ></input>
          </div>
          <div className="form-group col-4 mx-auto">
            <label>{t("Login.password")}</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
              className="form-control"
              onKeyDown={(event) => HandleKeyDown(event)}
            ></input>
          </div>
          <div className=" col-4 mx-auto">
            <span className="forgot-password">
              <u>{t("Login.forgot-password")}</u>
            </span>
          </div>
        </div>
        <button
          disabled={isLoading}
          onClick={() => HandleSubmitLogin()}
          className="btn-submit mx-auto col-4"
        >
          {isLoading === true && (
            <AiOutlineLoading3Quarters className="loading" />
          )}{" "}
          &nbsp;
          <span>{t("Login.loading")}</span>
        </button>
        <span onClick={() => navigate("/")} className="text-center back">
          {" "}
          &#60;&#60;- &#160; {t("Login.back")}
        </span>
      </div>
    </div>
  );
};

export default Login;
