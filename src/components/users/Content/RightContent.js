import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  let { QuizData } = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    props.HandleFinish();
  };

  const getClassQuestion = (question, index) => {
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((a) => a.isSelected === true);
      if (isAnswer) {
        return "question selected";
      }
    }
    return "question";
  };

  const HandleClickQuestion = (question, index) => {
    props.setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((a) => a.isSelected === true);
      if (isAnswer) {
        return;
      }
    }

    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-questions">
        {QuizData &&
          QuizData.length > 0 &&
          QuizData.map((item, index) => {
            return (
              <div
                onClick={() => HandleClickQuestion(item, index)}
                key={index}
                className={getClassQuestion(item, index)}
                ref={(el) => (refDiv.current[index] = el)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
