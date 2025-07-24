import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.scss";
import { getOverview } from "../../../service/apiService";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      let Qs = 0,
        As = 0,
        Qz = 0;
      Qs = res?.DT?.others?.countQuestions;
      As = res?.DT?.others?.countAnswers;
      Qz = res?.DT?.others?.countQuiz;
      const data = [
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
        {
          name: "Quizzes",
          Qz: Qz,
        },
      ];
      setDataChart(data);
    }
  };
  return (
    <>
      <div className="dashboard-container">
        <div className="title">{t("DashBoard.title")}</div>
        <div className="content">
          <div className="c-left">
            <div className="child">
              <span className="text-1">{t("DashBoard.content.user")}</span>
              <span className="text-2">
                {dataOverview &&
                dataOverview.users &&
                dataOverview.users.total ? (
                  <> {dataOverview.users.total}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
            <div className="child">
              <span className="text-1">{t("DashBoard.content.quiz")}</span>
              <span className="text-2">
                {dataOverview &&
                dataOverview.others &&
                dataOverview.others.countQuiz ? (
                  <>{dataOverview.others.countQuiz}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
            <div className="child">
              <span className="text-1">{t("DashBoard.content.question")}</span>
              <span className="text-2">
                {dataOverview &&
                dataOverview.others &&
                dataOverview.others.countQuestions ? (
                  <>{dataOverview.others.countQuestions}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
            <div className="child">
              <span className="text-1">{t("DashBoard.content.answer")}</span>
              <span className="text-2">
                {dataOverview &&
                dataOverview.others &&
                dataOverview.others.countAnswers ? (
                  <>{dataOverview.others.countAnswers}</>
                ) : (
                  <>0</>
                )}
              </span>
            </div>
          </div>
          <div className="c-right">
            <ResponsiveContainer width="95%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Qs"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="As"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
                <Bar
                  dataKey="Qz"
                  fill="#33dd41"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
