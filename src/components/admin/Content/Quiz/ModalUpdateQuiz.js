import { use } from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuizForAdmin } from "../../../../service/apiService";

import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ModalUpdateQuiz = (props) => {
  let { show, setShow, dataUpdateQuiz, FetchAllQuiz } = props;

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [quizImage, setQuizImage] = useState(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    setDescription(dataUpdateQuiz.description);
    setName(dataUpdateQuiz.name);
    setDifficulty(dataUpdateQuiz.difficulty);
    if (dataUpdateQuiz.image) {
      setPreview(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
    }
  }, [dataUpdateQuiz]);

  const HandleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setQuizImage(event.target.files[0]);
    } else {
      return;
    }
  };

  const handleClose = () => {
    setShow(false);
    setDescription("");
    setName("");
    setDifficulty("EASY");
    setQuizImage("null");
  };

  const handleSubmit = async () => {
    let res = await putUpdateQuizForAdmin(
      dataUpdateQuiz.id,
      description,
      name,
      difficulty?.value,
      quizImage
    );

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      FetchAllQuiz();
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
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
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="my-3">
              <p>Type</p>
              <Select
                defaultValue={difficulty}
                onChange={setDifficulty}
                options={options}
                placeholder="Quizz Type..."
              />
            </div>

            {/* <div className="col-md-6">
              <label className="form-label">Type</label>
              <input value={difficulty} type="text" className="form-control" />
            </div> */}
            {/* <div className="col-md-4">
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
            </div> */}
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

export default ModalUpdateQuiz;
