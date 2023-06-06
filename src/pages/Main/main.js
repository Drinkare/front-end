import { useNavigate } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "../Loader/loader";

import { InputHTMLAttributes } from "react";
import "./main.element.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const Main = ({ userData }) => {
  const [value, onChange] = useState(new Date());
  const [imgsrc, setImgsrc] = useState(null);
  const navigate = useNavigate();
  const [isLoading, SetIsLoading] = useState(false);
  let dictdata = {};
  let analyzedImage = new Image();

  const now = new Date();
  const year = now.getFullYear(); // 연도 가져오기 (네 자리 숫자로 반환)
  const month = now.getMonth() + 1; // 월 가져오기 (0부터 시작하므로 1을 더해줌)
  const day = now.getDate(); // 일 가져오기
  const todayDate = year + "-" + month + "-" + day;
  const [calendarList, setCalendarList] = useState([]);

  const handleCameraClick1 = useCallback(() => {
    let fileId = Date.now();
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    if (fileInput !== null) {
      fileInput.addEventListener("change", () => {
        if (fileInput.files == null) return;

        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append("image", file, file.name);

        console.log(formData.getAll("image"));

        SetIsLoading(true);

        ///기존 코드

        fetch("http://52.63.108.154:8000/upload_image", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            SetIsLoading(false);
            let img = new Image();
            img.src = "data:image/jpeg;base64," + data.image;

            dictdata = data.data;
            console.log("dict data", dictdata, dictdata.person);
            setImgsrc("data:image/jpeg;base64," + data.image);

            // 여기서 받아온 정보를 DB로 보내야함

            // 받은 이미지, 정보들 보내주기
            // fetch("http://15.165.161.157:8080/api/command/save", {
            //   method: "POST",

            //   body: JSON.stringify({
            //     userId: userData.id,
            //     people: dictdata.person,
            //     soju: dictdata.soju,
            //     beer: dictdata.beer,
            //     date: todayDate,
            //     images: imgsrc,
            //   }),
            // })
            //   .then((response) => response.json())
            //   .then((result) => {})
            //   .catch((error) => console.error("Error:", error));

            // document.body.appendChild(analyzedImage); // or wherever you want to put the image
          })
          .catch((error) => console.error("Error:", error)); //ml 서버 처리 에러 메시지
      });
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const getCalendarInfo = async () => {
        for (let m = 1; m <= month; m++) {
          //모든 달 정보 가져오기 위해 반복문
          fetch("http://15.165.161.157:8080/api/query/getmonth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userData.id,
              year: year,
              month: m,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              setCalendarList((prevList) => [...prevList, ...result.partyDate]);
            });
        }
      };
      getCalendarInfo();
    }
  }, [userData]);

  ////////////////////////

  return (
    userData && (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="mainCalendar">
              <Calendar
                onChange={onChange}
                value={value}
                formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                //tileContent 에 값이 있는 경우 dot class 추가

                tileContent={({ date, view }) => {
                  let html = [];
                  // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                  const formattedDate = moment(date).format("YYYY-MM-DD");

                  if (calendarList.find((x) => x === formattedDate)) {
                    html.push(<div className="dot"></div>);
                  }
                  return (
                    //여기서 각 날짜별 analyze 된 링크로 받아올 수 있어야함
                    <a
                      href={`/analyze?date=${formattedDate}`}
                      className="dotContainer"
                    >
                      {html}
                    </a>
                  );
                }}
              />
            </div>

            <div className="analyzedImage">
              <img src={imgsrc} />
            </div>

            <div className="navigatorBar">
              <div>
                <a href="/main">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    size="2x"
                    color="white"
                    className="iconContent"
                  />
                </a>
              </div>
              <div onClick={() => handleCameraClick1()}>
                <FontAwesomeIcon
                  icon={faCamera}
                  size="2x"
                  color="white"
                  className="iconContent"
                />
              </div>
              <div onClick={() => navigate("/user")}>
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  color="white"
                  className="iconContent"
                />
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default Main;
