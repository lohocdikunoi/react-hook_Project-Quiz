import { useState } from "react";
import Form from "react-bootstrap/Form";
import { postChangePassword } from "../../service/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const HandleSave = async () => {
    if (!(newPassword === confirmPassword)) {
      toast.error("Please confirm correct new password");
      return;
    }

    let data = await postChangePassword(currentPassword, newPassword);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <div className="password-current">
        <Form.Label htmlFor="inputPassword5">
          {t("ChangePassword.Current")}
        </Form.Label>
        <Form.Control
          onChange={(event) => setCurrentPassword(event.target.value)}
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        {/* <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text> */}
      </div>
      <div className="password-new">
        <Form.Label htmlFor="inputPassword5">
          {t("ChangePassword.New")}
        </Form.Label>
        <Form.Control
          onChange={(event) => setNewPassword(event.target.value)}
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        {/* <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text> */}
      </div>
      <div className="password-new-cf">
        <Form.Label htmlFor="inputPassword5">
          {t("ChangePassword.Confirm")}
        </Form.Label>
        <Form.Control
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        {/* <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text> */}
      </div>
      <button onClick={() => HandleSave()} className="btn btn-warning mt-3">
        {t("ChangePassword.save")}
      </button>
    </>
  );
};

export default ChangePassword;
