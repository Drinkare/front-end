import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./analyze.element.css";
import { useEffect, useState } from "react";
import imgSrc from "../../assets/hong.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { USER_DATA } from "../../constants/auth";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

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
      USER_DATA,
      JSON.stringify({
        id: "dong98",
        name: "신동현",
        age: 26,
        email: "shindh98@naver.com",
      })
    );
  };

  useEffect(() => {
    //tempLogin();
  }, []);
  //

  const onDownloadBtn = () => {
    const element = document.querySelector(".analyzeImage");
    domtoimage
      .toBlob(element)
      .then(function (blob) {
        saveAs(blob, "image.png");
      })
      .catch(function (error) {
        console.error("Error while downloading image:", error);
      });
  };

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
          <div className="analyzeBtnItem" onClick={onDownloadBtn}>
            {/* 
            https://velog.io/@chaeri93/React-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%B2%84%ED%8A%BC%EC%9C%BC%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 
            
            S3 서버에 올라온 이미지 다운받아오기
            
            */}
            <Custombutton type={2} name={"다운로드"} />
          </div>
        </div>
      </div>
    )
  );
};

export default AnalyzePage;
