import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./user.element.css";
import { useEffect, useState } from "react";
import React, { PureComponent } from "react";

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
  PieChart,
  Pie,
  Sector,
  Cell,
  LabelList,
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
    if (month < 10) {
      // return `${year}-0${month}`;
      return `0${month}월`;
    } else return `${month}월`;
  };

  return (
    userData && (
      <div className="userContainer">
        <div className="userTitle">
          안녕하세요 <b>{username}</b>님!
        </div>
        <div className="subTitle">
          <b>2023</b>년 월별 술 🍺 종류🍾 통계
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
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend
                  formatter={(value, entry) => {
                    if (value === "soju") {
                      return "소주";
                    } else if (value === "beer") {
                      return "맥주";
                    }
                  }}
                />
                <Bar dataKey="soju" barSize={20} fill="#17681b">
                  <LabelList dataKey="soju" position="top" />
                </Bar>

                <Bar dataKey="beer" barSize={20} fill="#a94305">
                  <LabelList dataKey="beer" position="top" />
                </Bar>

                {/* <Line type="monotone" dataKey="count" stroke="#A1D2FF" /> */}

                {/* <Line type="monotone" dataKey="count" stroke="#ff7300" /> */}
              </ComposedChart>
            </ResponsiveContainer>
            <div className="subTitle">
              <b>2023</b>년 월별 술자리 횟수 📈
            </div>
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
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                {/* <Legend
                  formatter={(value, entry) => {
                    if (value === "count") {
                      return "술자리 횟수";
                    }
                  }}
                /> */}

                <Bar dataKey="count" barSize={20}>
                  {dataList.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.count >= 15 ? "#FF0000" : "#3D55AB"}
                    />
                  ))}
                  <LabelList dataKey="count" position="top" />
                </Bar>

                {/* <Line type="monotone" dataKey="count" stroke="#ff7300" /> */}
              </ComposedChart>
            </ResponsiveContainer>
            {/* <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={dataList}
                  dataKey="soju"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#82ca9d"
                  label
                />
              </PieChart>
            </ResponsiveContainer> */}
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
