import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./analyze.element.css";
import { useEffect, useState } from "react";
import imgSrc from "../../assets/hong.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const AnalyzePage = () => {
  const navigate = useNavigate();
  const now = new Date();
  const year = now.getFullYear(); // 연도 가져오기 (네 자리 숫자로 반환)
  const month = now.getMonth() + 1; // 월 가져오기 (0부터 시작하므로 1을 더해줌)
  const day = now.getDate(); // 일 가져오기
  const [userData, setUserData] = useState(null);

  const dummyData = {
    people: 2,
    soju: 3,
    beer: 5,
  };
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
      <div className="analyzeContainer">
        <img src={imgSrc} width="200px" className="analyzeImage" />
        <div className="analyzeTextContainer">
          <div className="analyzeTextContent">
            {year}년 {month}월 {day}일
          </div>
          <div className="analyzeTextContent">
            <b>{userData.name}</b>님 총 <b>{dummyData.people}</b>명과 함께
            하셨군요
          </div>
          <div className="analyzeTextContent">
            맥주 🍻 <b>{dummyData.beer}</b> 병, 소주 🍾 <b>{dummyData.soju}</b>
            병을 마셨습니다
          </div>
        </div>
        <div className="analyzeBtn">
          <div className="analyzeBtnItem" onClick={() => navigate("/main")}>
            <Custombutton type={1} name={"뒤로가기"} />
          </div>
          <div className="analyzeBtnItem" onClick={() => navigate("/login")}>
            <Custombutton type={2} name={"등록하기"} />
          </div>
        </div>
      </div>
    )
  );
};

export default AnalyzePage;
