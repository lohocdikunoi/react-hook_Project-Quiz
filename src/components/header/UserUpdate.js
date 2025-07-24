import { useTranslation } from "react-i18next";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import _ from "lodash";
import { postUpdateProfile } from "../../service/apiService";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const account = useSelector((state) => state.user.data);

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreview(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const { t } = useTranslation();
  const [preview, setPreview] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");

  const HandleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      return;
    }
  };

  const HandleSave = async () => {
    if (!username) {
      toast.error("Validate Username");
      return;
    }

    let data = await postUpdateProfile(username, image);
    console.log(data);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setUsername(data.username);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <div className="modal-user-update">
        <form className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{t("UpdateUser.Username")}</label>
            <input
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={email}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">{t("UpdateUser.Role")}</label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              id="inputState"
              className="form-select"
              disabled
            >
              <option value="USER">{t("UpdateUser.USER")}</option>
              <option value="ADMIN">{t("UpdateUser.ADMIN")}</option>
            </select>
          </div>
          <div className="col-md-12">
            <label
              htmlFor="upload-file"
              className="form-label label-upload-file"
            >
              {" "}
              <FcPlus /> {t("UpdateUser.upload-file")}
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
              <span>{t("UpdateUser.img-preview")}</span>
            )}
          </div>
        </form>
        <Button onClick={() => HandleSave()} variant="primary">
          {t("UpdateUser.Save")}
        </Button>
      </div>
    </>
  );
};
export default UserUpdate;
