import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../service/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQA from "./AssignQA";
import { getAllQuizForAdmin } from "../../../../service/apiService";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const [listQuiz, setListQuiz] = useState([]);
  const [listQuizSelect, setListQuizSelect] = useState([]);

  const FetchAllQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      let newListQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuizSelect(newListQuiz);
    }
  };

  const HandleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const HandleSave = async () => {
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
      FetchAllQuiz();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <div className="my-3 add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add New Quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                  <label for="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Description..."
                  />
                  <label for="floatingPassword">Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder="Quizz Type..."
                  />
                </div>
                <div className="more-action">
                  <label className="form-group">Upload File</label>
                  <input
                    onChange={(event) => HandleChangeFile(event)}
                    className="form-control my-1"
                    type="file"
                  ></input>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => HandleSave()}
                    className="btn btn-warning"
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail mt-3">
              <TableQuiz listQuiz={listQuiz} FetchAllQuiz={FetchAllQuiz} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Question/Answer</Accordion.Header>
          <Accordion.Body>
            <QuizQA listQuiz={listQuizSelect} FetchAllQuiz={FetchAllQuiz} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign Question/Answer</Accordion.Header>
          <Accordion.Body>
            <AssignQA
              listQuizSelect={listQuizSelect}
              FetchAllQuiz={FetchAllQuiz}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
