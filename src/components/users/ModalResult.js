import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalResult = (props) => {
  const { show, setShow, dataResult, HandleShowAnswer } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Question : <b>{dataResult.countTotal}</b>
          </div>
          <div>
            Total Correct Answers : <b>{dataResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              props.HandleShowAnswer();
            }}
          >
            Show Answers
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Cannel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
