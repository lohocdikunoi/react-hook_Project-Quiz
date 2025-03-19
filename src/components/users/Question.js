import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;
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
          <img src={`data:image/jpeg;base64,${data.image}`} />
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
                    className="form-check-input"
                    type="checkbox"
                    onChange={() =>
                      HandleCheckBoxChecked(a.id, data.questionId)
                    }
                    checked={a.isSelected}
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
