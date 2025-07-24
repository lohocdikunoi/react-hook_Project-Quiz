import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../../service/apiService";
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = (props) => {
  const { t } = useTranslation();
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
          <Modal.Title>{t("DeleteQuiz.Title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("DeleteQuiz.Body")}{" "}
          <b>
            {t("DeleteQuiz.ID")}: {dataDeleteQuiz.id}
          </b>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("DeleteQuiz.Cancel")}
          </Button>
          <Button variant="primary" onClick={() => HandleDeleteQuiz()}>
            {t("DeleteQuiz.Confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
