import { useEffect, useState } from "react";
import { getQuizById, postSubmitAnswer } from "../../service/apiService";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = (props) => {
  const location = useLocation();
  const params = useParams();
  let QuizId = params.id;

  const [QuizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);

  const [ShowModalResult, setShowModalResult] = useState(false);
  const [DataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuizId();
  }, [QuizId]);

  const fetchQuizId = async () => {
    let res = await getQuizById(QuizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setQuizData(data);
    }
  };

  const HandleCheckBox = (answerId, questionId) => {
    let QuizDataClone = _.cloneDeep(QuizData);
    let question = QuizDataClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = QuizDataClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      QuizDataClone[index] = question;
      setQuizData(QuizDataClone);
    }
  };

  const HandlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const HandleNext = () => {
    if (QuizData && QuizData.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const HandleFinish = async () => {
    let submit_answer = {
      quizId: +QuizId,
      answers: [],
    };

    if (QuizData && QuizData.length > 0) {
      let answers = [];
      QuizData.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((answers) => {
          if (answers.isSelected) {
            userAnswerId.push(answers.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
        submit_answer.answers = answers;
      });
    }
    let res = await postSubmitAnswer(submit_answer);
    console.log(res);
    if (res && res.EC === 0) {
      setShowModalResult(true);
      setDataModalResult({
        countCorrect: res?.DT?.countCorrect,
        countTotal: res?.DT?.countTotal,
        quizData: res?.DT?.quizData,
      });
    } else {
      alert("Something wrong...");
    }
  };

  return (
    <div className="Detail-Quiz_container">
      <div className="Left-content">
        <div className="title">
          Quiz {QuizId}: {location?.state?.QuizTitle}
        </div>
        <hr />
        <div className="q-content">
          <Question
            HandleCheckBox={HandleCheckBox}
            data={QuizData && QuizData.length > 0 ? QuizData[index] : []}
            index={index}
          />
        </div>
        <div className="footer">
          <button onClick={() => HandlePrev()} className="btn btn-primary">
            Prev
          </button>
          <button onClick={() => HandleNext()} className="btn btn-secondary">
            Next
          </button>
          <button onClick={() => HandleFinish()} className="btn btn-warning">
            Finish
          </button>
        </div>
      </div>
      <div className="Right-content">
        <RightContent />
      </div>
      <ModalResult
        dataResult={DataModalResult}
        show={ShowModalResult}
        setShow={setShowModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
