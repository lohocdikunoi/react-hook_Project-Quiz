import { useState } from "react";
import "./Register.scss";
import { postRegister } from "../../service/apiService";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Register = () => {
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
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className="content col-4 mx-auto">
        <div className="title">Trinh Kim Vien</div>
        <div className="welcome">
          Get better data with conversational forms, surveys, quizzes & more.
        </div>
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
            <input onClick={() => setAccept(!accept)} type="checkbox"></input> I
            agree to Typeform’s Terms of Service, Privacy Policy and Data
            Processing Agreement.
          </label>
        </div>
        <button onClick={() => HandleSubmitRegister()} className="btn">
          Create my free account
        </button>
      </div>
    </div>
  );
};

export default Register;
