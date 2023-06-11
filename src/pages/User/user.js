import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./user.element.css";
import { useEffect, useState } from "react";
import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const User = ({ userData }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (userData === null) {
      return;
    }

    const getId = async () => {
      fetch("http://15.165.161.157:8080/api/query/getinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setUsername(result.name);
          setDataList(result.list);
        });
    };

    getId();
  }, []);
  const formatDate = (month) => {
    const now = new Date();
    const year = now.getFullYear();
    return `${year}-${month}`;
  };

  const getCustomLabel = (label) => {
    if (label === "soju") {
      return "소주";
    } else if (label === "beer") {
      return "맥주";
    } else if (label === "count") {
      return "술자리 횟수";
    }

    return label;
  };

  return (
    userData && (
      <div className="userContainer">
        <div className="userTitle">
          안녕하세요 <b>{username}</b>님!
        </div>
        <div className="subTitle">
          <b>2023</b>년 월별 술자리 분석
        </div>
        <div className="userStatisticsContainer">
          <div className="userStatisticsItem">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={500}
                height={400}
                data={dataList}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                  dataKey="month"
                  scale="band"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend tickFormatter={getCustomLabel} />

                <Bar dataKey="soju" barSize={20} fill="#92E0EB" />
                <Bar dataKey="beer" barSize={20} fill="#C1B2ED" />
                <Bar dataKey="count" barSize={20} fill="#A1D2FF" />

                {/* <Line type="monotone" dataKey="count" stroke="#A1D2FF" /> */}

                {/* <Line type="monotone" dataKey="count" stroke="#ff7300" /> */}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="userBtn" onClick={() => navigate("/main")}>
          <Custombutton type={1} name={"뒤로가기"} />
        </div>
      </div>
    )
  );
};
export default User;
