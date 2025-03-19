import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../../service/apiService";

const ModalDeleteQuiz = (props) => {
  let { show, setShow, dataDeleteQuiz, FetchAllQuiz } = props;

  const handleClose = () => {
    setShow(false);
  };

  const HandleDeleteQuiz = async () => {
    let res = await deleteQuizForAdmin(dataDeleteQuiz.id);

    if (res && res.EC === 0) {
      toast.success("Delete the quiz succsess");
      handleClose();
      FetchAllQuiz();
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this Quiz. <b>id: {dataDeleteQuiz.id}</b>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cannel
          </Button>
          <Button variant="primary" onClick={() => HandleDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
