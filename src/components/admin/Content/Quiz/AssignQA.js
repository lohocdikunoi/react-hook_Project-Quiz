import { useState, useEffect } from "react";
import Select from "react-select";
import { postAssignQA, getAllUser } from "../../../../service/apiService";
import { toast } from "react-toastify";

const AssignQA = (props) => {
  let { listQuizSelect, FetchAllQuiz } = props;
  const [quizSelect, setQuizSelect] = useState({});
  // const [listQuiz, setListQuiz] = useState([]);

  const [userSelect, setUserSelect] = useState({});
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    FetchAllQuiz();
    FetchAllUser();
  }, []);

  const FetchAllUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let newListUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.username} - ${item.email}`,
        };
      });
      setListUser(newListUser);
    }
  };

  const HandleAssign = async () => {
    let res = await postAssignQA(quizSelect.value, userSelect.value);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  // const FetchAllQuiz = async () => {
  //   let res = await getAllQuizForAdmin();
  //   // if (res && res.EC === 0) {
  //   //   let newListQuiz = res.DT.map((item) => {
  //   //     return {
  //   //       value: item.id,
  //   //       label: `${item.id} - ${item.description}`,
  //   //     };
  //   //   });
  //   //   setListQuiz(newListQuiz);
  //   // }
  // };

  return (
    <div className="assign-container">
      <div className="select row">
        <div className="question-type col-md-6">
          Select Quiz:
          <Select
            value={quizSelect}
            onChange={setQuizSelect}
            options={listQuizSelect}
          />
        </div>
        <div className="question-type col-md-6">
          Select User:
          <Select
            value={userSelect}
            onChange={setUserSelect}
            options={listUser}
          />
        </div>
      </div>
      <div>
        <button onClick={() => HandleAssign()} className="btn btn-warning mt-3">
          Assign Submit
        </button>
      </div>
    </div>
  );
};

export default AssignQA;
