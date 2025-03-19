import { useEffect, useState } from "react";
import { getQuizByUser } from "../../service/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const navigate = useNavigate();
  const [ArrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <>
      <div className="List-Quiz_container container">
        {ArrQuiz &&
          ArrQuiz.length > 0 &&
          ArrQuiz.map((quiz, index) => {
            return (
              <div key={quiz.id} className="card" style={{ width: "18rem" }}>
                <img
                  src={`data:image/jpeg;base64,${quiz.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text">{quiz.description}</p>
                  <button
                    onClick={() =>
                      navigate(`/quiz/${quiz.id}`, {
                        state: { QuizTitle: quiz.description },
                      })
                    }
                    className="btn btn-primary"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            );
          })}

        {ArrQuiz && ArrQuiz.length === 0 && (
          <>
            <div>You don't have any quiz now...</div>
          </>
        )}
      </div>
    </>
  );
};

export default ListQuiz;
