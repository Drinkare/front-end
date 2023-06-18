import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./analyze.element.css";
import { useEffect, useState } from "react";
import imgSrc from "../../assets/analyzedPhoto.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { USER_DATA } from "../../constants/auth";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";

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
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onDownloadBtn = () => {
    const imageUrl = dataList.image;
    console.log("image Url: ", imageUrl);
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, "img_${analyzedDate}.jpeg");
      })
      .catch((err) => {
        console.error("Error downloading image:", err);
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let analyzedate = searchParams.get("date");

    if (!analyzedate) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      analyzedate = year + "-" + month + "-" + day;
      console.log(analyzedate);
    }

    const [year, month, day] = analyzedate.split("-");
    setDateInfo({
      year,
      month,
      day,
    });

    const getDetail = () => {
      fetch("http://15.165.161.157:8080/api/query/getdetail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localUserId,
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
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    userData && (
      <div className="analyzeContainer">
        <div>
          <img src={dataList.image} width="200px" className="analyzeImage" />
        </div>
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
            <Custombutton type={2} name={"다운로드"} />
          </div>
        </div>
      </div>
    )
  );
};

export default AnalyzePage;
