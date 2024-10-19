import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { putUpdateUser } from "../../../service/apiService";
import { toast } from "react-toastify";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleSubmit = async () => {
    if (!username) {
      toast.error("Validate Username");
      return;
    }

    let data = await putUpdateUser(dataUpdate.id, username, role, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchUserWithPaginate(props.currentPage);
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
      <Modal
        className="Modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                disabled
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                id="inputState"
                className="form-select"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label
                htmlFor="upload-file"
                className="form-label label-upload-file"
              >
                {" "}
                <FcPlus /> Upload file image
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
                <span> Preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
