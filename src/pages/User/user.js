import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./user.element.css";
import { useEffect, useState } from "react";
import imgSrc from "../../assets/hong.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const dummyData = [
    {
      date: "2023-02",
      drink: 13,
      count: 14,
    },
    {
      date: "2023-03",
      drink: 35,
      count: 20,
    },
    {
      date: "2023-04",
      drink: 17,
      count: 10,
    },
    {
      date: "2023-05",
      drink: 42,
      count: 24,
    },
  ];

  //
  const tempLogin = () => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        id: "dong98",
        name: "신동현",
        age: 26,
        email: "shindh98@naver.com",
      })
    );
  };

  useEffect(() => {
    tempLogin();
  }, []);
  //

  useEffect(() => {
    const getUserData = () => {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    };
    getUserData();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    userData && (
      <div className="userContainer">
        <div className="userTitle">
          안녕하세요 <b>{userData.name}</b>님!
        </div>
        <div className="userStatisticsContainer">
          <div className="userStatisticsItem">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={500}
                height={400}
                data={dummyData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="drink" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="drink" stroke="blue" />

                <Line type="monotone" dataKey="count" stroke="#ff7300" />
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
