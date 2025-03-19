import { useEffect, useState } from "react";
// import { getAllQuizForAdmin } from "../../../../service/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useToast } from "react-toastify";

const TableQuiz = (props) => {
  let { listQuiz, FetchAllQuiz } = props;
  // const [listQuiz, setListQuiz] = useState([]);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});

  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalUpdateQuiz, setshowModalUpdateQuiz] = useState(false);

  useEffect(() => {
    FetchAllQuiz();
  }, []);

  // const FetchAllQuiz = async () => {
  //   let res = await getAllQuizForAdmin();
  //   if (res && res.EC === 0) {
  //     setListQuiz(res.DT);
  //   }
  // };

  const HandleDeleteQuiz = (dataQuiz) => {
    setShowModalDeleteQuiz(true);
    setDataDeleteQuiz(dataQuiz);
  };

  const HandleUpdateQuiz = (dataQuiz) => {
    setshowModalUpdateQuiz(true);
    setDataUpdateQuiz(dataQuiz);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th
              style={{ display: "flex", justifyContent: "center" }}
              scope="col"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr>
                  <td key={`list-Quiz-${index}`} scope="row">
                    {item.id}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => HandleUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => HandleDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
        FetchAllQuiz={FetchAllQuiz}
      />
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setshowModalUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        FetchAllQuiz={FetchAllQuiz}
      />
    </>
  );
};
export default TableQuiz;
