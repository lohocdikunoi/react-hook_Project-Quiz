import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const { data, index, showAnswer } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const HandleCheckBoxChecked = (answerId, questionId) => {
    props.HandleCheckBox(answerId, questionId);
  };
  return (
    <>
      {data.image ? (
        <div className="image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
          />
          {isPreviewImage === true && (
            <Lightbox
              onClose={() => setIsPreviewImage(false)}
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question_Image"}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="image"></div>
      )}

      <div className="question">
        Question {index + 1}: {data.questionDescription} ?
      </div>

      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answers ${index}`} className="a-child">
                <div className="form-check">
                  <input
                    disabled={showAnswer}
                    className="form-check-input"
                    type="checkbox"
                    onChange={() =>
                      HandleCheckBoxChecked(a.id, data.questionId)
                    }
                    checked={a.isSelected}
                  />
                  <label className="form-check-label">{a.description}</label>
                  {showAnswer === true && (
                    <>
                      {a.isSelected === true && !a.isCorrect && (
                        <IoIosClose className="incorrect" />
                      )}

                      {a.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
