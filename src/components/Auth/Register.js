import { useState } from "react";
import "./Register.scss";
import { postRegister } from "../../service/apiService";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Language from "../header/Language";
import { Translation, useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const navigate = new useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [accept, setAccept] = useState(false);
  const [isShowpassword, setShowpassword] = useState(false);

  const HandleSubmitRegister = async () => {
    let isValidateEmail = validateEmail(email);

    if (!isValidateEmail) {
      toast.error("Validate Email");
      return;
    }

    if (!password) {
      toast.error("Validate Password");
      return;
    }

    if (!username) {
      toast.error("Validate Username");
      return;
    }

    let data = await postRegister(email, username, password);

    if (accept) {
      if (data && data.EC === 0) {
        toast.success(data.EM);
        navigate("/login");
      }

      if (data && data.EC !== 0) {
        toast.error(data.EM);
      }
    } else {
      toast.error("Please agree to the terms!");
    }
  };

  return (
    <div className="Register_container">
      <div className="header">
        <span>{t("Register.header")}</span>
        <button onClick={() => navigate("/login")}>
          {t("Register.login")}
        </button>
        <Language />
      </div>
      <div className="content col-4 mx-auto">
        <div className="title">Trinh Kim Vien</div>
        <div className="welcome">{t("Register.welcome")}</div>
        <div className="group-form">
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="email"
            className="form-control"
            placeholder="Email"
          ></input>
          <input
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            type="text"
            className="form-control"
            placeholder="Username "
          ></input>
          <div className="form-password ">
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type={isShowpassword ? "text" : "password"}
              className="form-control"
              placeholder="Password "
            ></input>
            {isShowpassword ? (
              <span onClick={() => setShowpassword(false)} className="eyes">
                {" "}
                <IoIosEye />{" "}
              </span>
            ) : (
              <span onClick={() => setShowpassword(true)} className="eyes">
                {" "}
                <IoIosEyeOff />
              </span>
            )}
          </div>

          <label>
            <input onClick={() => setAccept(!accept)} type="checkbox"></input>
            {t("Register.checkbox")}
          </label>
        </div>
        <button onClick={() => HandleSubmitRegister()} className="btn">
          {t("Register.submit")}
        </button>
      </div>
    </div>
  );
};

export default Register;
