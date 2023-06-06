import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./analyze.element.css";
import { useEffect, useState } from "react";
import imgSrc from "../../assets/analyzedPhoto.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { USER_DATA } from "../../constants/auth";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";

// year, month, date

// username

// imgUrl
// beer
// soju
// people

const AnalyzePage = ({ userData }) => {
  const [dateInfo, setDateInfo] = useState({
    year: 0,
    month: 0,
    day: 0,
  });

  const [username, setUsername] = useState("");
  const [dataList, setDataList] = useState({
    image: "",
    beer: 0,
    soju: 0,
    people: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

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
    const searchParams = new URLSearchParams(location.search);
    let analyzedate = searchParams.get("date");

    if (!analyzedate) {
      const now = new Date();
      const year = now.getFullYear(); // 연도 가져오기 (네 자리 숫자로 반환)
      const month = now.getMonth() + 1; // 월 가져오기 (0부터 시작하므로 1을 더해줌)
      const day = now.getDate(); // 일 가져오기
      analyzedate = year + "-" + month + "-" + day;
      console.log(analyzedate);
    }

    const [year, month, day] = analyzedate.split("-");
    setDateInfo({
      year,
      month,
      day,
    });

    // date, userId 로 post 요청 보내기
    const getDetail = () => {
      fetch("http://15.165.161.157:8080/api/query/getdetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localUserId,
          // userId: userData.id,
          date: analyzedate,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("result:", result);
          console.log("list:", result.list[0]);
          setDataList(result.list[0]);
          setUsername(result.name);
        });
    };

    const onInit = async () => {
      await getDetail();
      // console.log("data:", data);
      // if (data && data.list && data.list.length > 0) {
      //   console.log("dddd");
      //   setData(data.list[0]);
      //   setUsername(data.name);
      //   console.log("data2:", data);
      // }
      // setData(data.list[0]);
      // setUsername(data.name);
    };

    const localUserId = JSON.parse(localStorage.getItem(USER_DATA)).id;
    console.log(location);
    console.log("anlyzedate:", analyzedate);

    //getDetail();

    onInit();
  }, [userData]);

  // useEffect(() => {
  //   setDataList(data.list[0]);
  //   setUsername(data.name);
  // }, [data]);
  // useLocation? query parameter 가져오는 라이브러리

  return (
    userData && (
      <div className="analyzeContainer">
        <img src={dataList.image} width="200px" className="analyzeImage" />
        {/* <img src={data.imgUrl} width="200px" className="analyzeImage" /> */}
        <div className="analyzeTextContainer">
          <div className="analyzeTextContent">
            {dateInfo.year}년 {dateInfo.month}월 {dateInfo.day}일
          </div>
          <div className="analyzeTextContent">
            <b>{username}</b>님 총 <b>{dataList.people}</b>명과 함께 하셨군요
          </div>
          <div className="analyzeTextContent">
            맥주 🍻 <b>{dataList.beer}</b> 병, 소주 🍾 <b>{dataList.soju}</b>
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
