import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../service/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const LIMIT_USER = 3;

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [ListUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchUserWithPaginate(1);
  }, []);

  const fetchAllUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const HandleBtnUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const HandleBtnViewUser = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };

  const HandleBtnDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  return (
    <div className="ManageUser-container">
      <div className="manage-title">Manage User</div>
      <div className="manage-content">
        <div className="Add-User">
          <button
            onClick={() => setShowModalCreateUser(true)}
            className="btn btn-primary"
          >
            {" "}
            <FcPlus />
            Add new user
          </button>
        </div>
        <div>
          {/* <TableUser
            HandleBtnDeleteUser={HandleBtnDeleteUser}
            HandleBtnViewUser={HandleBtnViewUser}
            HandleBtnUpdateUser={HandleBtnUpdateUser}
            ListUsers={ListUsers}
          /> */}
          <TableUserPaginate
            HandleBtnDeleteUser={HandleBtnDeleteUser}
            HandleBtnViewUser={HandleBtnViewUser}
            HandleBtnUpdateUser={HandleBtnUpdateUser}
            ListUsers={ListUsers}
            fetchUserWithPaginate={fetchUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchAllUser={fetchAllUser}
          fetchUserWithPaginate={fetchUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchAllUser={fetchAllUser}
          dataUpdate={dataUpdate}
          resetDataUpdate={resetDataUpdate}
          fetchUserWithPaginate={fetchUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          resetDataUpdate={resetDataUpdate}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchAllUser={fetchAllUser}
          fetchUserWithPaginate={fetchUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
