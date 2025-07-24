import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import UserUpdate from "./UserUpdate";
import "./Profile.scss";
import ChangePassword from "./ChangePassword";
import History from "./History";
import { useTranslation } from "react-i18next";

const Profile = (props) => {
  const { t } = useTranslation();
  const { show, setShow } = props;

  const handleClose = () => setShow(false);
  return (
    <div className="modal show">
      <Modal backdrop="static" size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Profile.title")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Information" title={t("Profile.infor")}>
              <UserUpdate />
            </Tab>
            <Tab eventKey="Password" title={t("Profile.password")}>
              <ChangePassword />
            </Tab>
            <Tab eventKey="History" title={t("Profile.history")}>
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
