import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const ModalViewUser = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreview("");
    props.resetDataUpdate();
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setEmail(dataUpdate.email);
    setUsername(dataUpdate.username);
    setRole(dataUpdate.role);
    if (dataUpdate.image) {
      setPreview(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);

  return (
    <>
      <Modal
        className="Modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("ViewUser.Title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("ViewUser.Password")}</label>
              <input
                disabled
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">{t("ViewUser.Username")}</label>
              <input
                disabled
                value={username}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">{t("ViewUser.Role")}</label>
              <select
                disabled
                value={role}
                id="inputState"
                className="form-select"
              >
                <option value="USER">{t("ViewUser.USER")}</option>
                <option value="ADMIN">{t("ViewUser.ADMIN")}</option>
              </select>
            </div>

            <div className="col-md-12  img-preview">
              {preview ? (
                <img src={preview}></img>
              ) : (
                <span> {t("ViewUser.img-preview")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("ViewUser.Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
