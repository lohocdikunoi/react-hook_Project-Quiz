import Table from "react-bootstrap/Table";
import { getHistory } from "../../service/apiService";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const History = () => {
  const { t } = useTranslation();
  const [dataHistory, setDataHistory] = useState({});
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let data = await getHistory();
    console.log(data);
    if (data && data.EC === 0) {
      let newData = data?.DT?.data.map((item) => {
        return {
          ID: item?.id,
          Quiz_Name: item?.quizHistory?.name,
          Total_Question: item?.total_questions,
          Total_Correct: item?.total_correct,
          Date: dayjs(item?.updatedAt).format("DD/MM/YYYY hh:mm A"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
        setDataHistory(newData);
      }
    }
  };

  console.log(dataHistory);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t("History.ID")}</th>
            <th>{t("History.Name")}</th>
            <th>{t("History.Question")}</th>
            <th>{t("History.Correct")}</th>
            <th>{t("History.date")}</th>
          </tr>
        </thead>
        <tbody>
          {dataHistory &&
            dataHistory.length > 0 &&
            dataHistory.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.ID}</td>
                  <td>{item.Quiz_Name}</td>
                  <td>{item.Total_Question}</td>
                  <td>{item.Total_Correct}</td>
                  <td>{item.Date}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
export default History;
