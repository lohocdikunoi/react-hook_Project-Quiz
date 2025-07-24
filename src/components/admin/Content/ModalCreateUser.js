import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { postCreateUser } from "../../../service/apiService";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

const ModalCreateUser = (props) => {
  const { t } = useTranslation();
  const { show, setShow } = props;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async () => {
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

    let data = await postCreateUser(email, password, username, role, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchUserWithPaginate(1);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreview("");
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const HandleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      return;
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        className="Modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("CreateUser.Title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("CreateUser.Password")}</label>
              <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t("CreateUser.Username")}</label>
              <input
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">{t("CreateUser.Role")}</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                id="inputState"
                className="form-select"
              >
                <option value="USER">{t("CreateUser.USER")}</option>
                <option value="ADMIN">{t("CreateUser.ADMIN")}</option>
              </select>
            </div>
            <div className="col-md-12">
              <label
                htmlFor="upload-file"
                className="form-label label-upload-file"
              >
                {" "}
                <FcPlus /> {t("CreateUser.upload-file")}
              </label>
              <br />
              <input
                onChange={(event) => HandleUploadImage(event)}
                type="file"
                hidden
                id="upload-file"
              />
            </div>
            <div className="col-md-12  img-preview">
              {preview ? (
                <img src={preview}></img>
              ) : (
                <span>{t("CreateUser.img-preview")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("CreateUser.Close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            {t("CreateUser.Save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
