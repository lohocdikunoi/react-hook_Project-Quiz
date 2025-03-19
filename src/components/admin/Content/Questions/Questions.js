import { useState, useEffect } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { TbCircleMinus } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";

import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../service/apiService";

const Questions = () => {
  const [questionSelect, setQuestionSelect] = useState({});

  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    url: "",
    title: "",
  });

  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    FetchAllQuiz();
  }, []);

  const FetchAllQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newListQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newListQuiz);
    }
  };

  const HandleAddRemoveQuestions = (type, id) => {
    if (type === "ADD") {
      let newQuestions = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestions]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      console.log(questionsClone);
      setQuestions(questionsClone);
    }
  };

  const HandleAddRemoveAnswer = (type, questionID, answerID) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      let index = questionsClone.findIndex((item) => item.id === questionID);
      let newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionID);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerID
      );
      setQuestions(questionsClone);
    }
  };

  const HandleOnChangeQuestion = (type, questionID, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionID);
    if (type === "QUESTION") {
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const HandleOnChangeFile = (questionID, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionID);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const HandleOnChangeAnswer = (type, questionID, answerID, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionID);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerID) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const HandleSubmitQuestion = async () => {
    if (_.isEmpty(questionSelect)) {
      toast.error("Please Choose a Question");
      return;
    }

    let inValidA = true,
      inValidQ = true,
      indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          inValidA = false;
          indexA = j;
          break;
        }
      }
      if (inValidA === false) {
        indexQ = i;
        break;
      }
    }
    if (inValidA === false) {
      toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        inValidQ = false;
        indexQ = i;
        break;
      }
    }

    if (inValidQ === false) {
      toast.error(`Not Empty Description for Question ${indexQ + 1}`);
      return;
    }

    for (const question of questions) {
      let q = await postCreateNewQuestionForQuiz(
        +questionSelect.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }

    toast.success("Create Question and Answer Succed!");
    setQuestions(initQuestion);
    setQuestionSelect({});
  };

  const HanlePreviewImage = (questionID) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionID);
    console.log(URL.createObjectURL(questionsClone[index].imageFile));
    if (index > -1) {
      setDataImage({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="question-type">
        Select Quiz:
        <Select
          value={questionSelect}
          onChange={setQuestionSelect}
          options={listQuiz}
        />
      </div>
      <div className="title-question mt-3"> Add Question:</div>
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="add-new-question">
              <div className="question-content">
                <div className="description">
                  <div class="form-floating mb-3 description-input">
                    <input
                      onChange={(event) =>
                        HandleOnChangeQuestion(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                      value={question.description}
                      placeholder=""
                      type="text"
                      class="form-control"
                    />
                    <label for="floatingInput">
                      Question's {index + 1} {question.description}
                    </label>
                  </div>
                </div>
                <div className="upload-file">
                  <label htmlFor={`${question.id}`} className="upload">
                    <RiImageAddFill />
                  </label>
                  <input
                    id={`${question.id}`}
                    onChange={(event) => HandleOnChangeFile(question.id, event)}
                    hidden
                    type={"file"}
                  ></input>
                  <span className="name-file">
                    {question.imageName ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => HanlePreviewImage(question.id)}
                      >
                        {question.imageName}
                      </span>
                    ) : (
                      "0 file uploaded"
                    )}
                  </span>
                </div>
                <div className="icon">
                  <span
                    onClick={() => HandleAddRemoveQuestions("ADD", "")}
                    className="plus"
                  >
                    <BsPatchPlusFill />
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        HandleAddRemoveQuestions("REMOVE", question.id)
                      }
                      className="minus"
                    >
                      <BsPatchMinusFill />
                    </span>
                  )}
                </div>
              </div>

              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <div key={answer.id} className="question-answer">
                      <div className="form-check box">
                        <input
                          onChange={(event) =>
                            HandleOnChangeAnswer(
                              "CHECKBOX",
                              question.id,
                              answer.id,
                              event.target.checked
                            )
                          }
                          checked={answer.isCorrect}
                          className="form-check-input"
                          type="checkbox"
                        />
                      </div>
                      <div class="form-floating mb-3 answer">
                        <input
                          value={answer.description}
                          onChange={(event) =>
                            HandleOnChangeAnswer(
                              "INPUT",
                              question.id,
                              answer.id,
                              event.target.value
                            )
                          }
                          placeholder=""
                          type="text"
                          class="form-control"
                        />
                        <label for="floatingInput">
                          Answer {index + 1} {answer.description}
                        </label>
                      </div>
                      <div className="icon">
                        <span
                          onClick={() =>
                            HandleAddRemoveAnswer("ADD", question.id)
                          }
                          className="plus"
                        >
                          <AiOutlinePlusSquare />
                        </span>
                        {question.answers.length > 1 && (
                          <span
                            onClick={() =>
                              HandleAddRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id
                              )
                            }
                            className="minus"
                          >
                            <TbCircleMinus />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      {isPreviewImage === true && (
        <Lightbox
          onClose={() => setIsPreviewImage(false)}
          image={dataImage.url}
          title={dataImage.title}
        ></Lightbox>
      )}

      {questions && questions.length > 0 && (
        <div>
          <button
            onClick={() => HandleSubmitQuestion()}
            className="btn btn-warning"
          >
            Save Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
