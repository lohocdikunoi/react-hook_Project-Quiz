import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../service/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteUser = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const HandleDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);

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

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("DeleteUser.Title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("DeleteUser.Body")}{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("DeleteUser.Cancel")}
          </Button>
          <Button variant="primary" onClick={() => HandleDeleteUser()}>
            {t("DeleteUser.Confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
