import { useNavigate } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "../Loader/loader";
import { USER_DATA } from "../../constants/auth";
import { InputHTMLAttributes } from "react";
import "./main.element.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { atob } from "js-base64";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

const Main = ({ userData }) => {
  const [value, onChange] = useState(new Date());
  const [imgsrc, setImgsrc] = useState(null);
  const navigate = useNavigate();
  const [isLoading, SetIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  let dictdata = {};
  let analyzedImage = new Image();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const [calendarList, setCalendarList] = useState([]);
  const localUserId = JSON.parse(localStorage.getItem(USER_DATA)).id;

  const handleCalendarSelect = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log("선택한 날짜:", formattedDate);
    setSelectedDate(date); // 선택된 날짜 업데이트
  };

  const handleCameraClick1 = useCallback(() => {
    let todayDate = year + "-" + month + "-" + day;

    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      console.log("저장할 날짜:", formattedDate);
      todayDate = formattedDate;
      console.log("저장할 날짜:", todayDate);
    }

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

        fetch("http://3.26.255.24:8000/upload_image2", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            SetIsLoading(false);
            let img = new Image();
            img.src = "data:image/jpeg;base64," + data.image;

            dictdata = data.data;
            setImgsrc("data:image/jpeg;base64," + data.image);

            console.log();
            // 여기서 받아온 정보를 DB로 보내야함
            const formData2 = new FormData();

            const json = JSON.stringify({
              userId: localUserId,
              people: dictdata.person,
              soju: dictdata.soju,
              beer: dictdata.beer,
              date: todayDate,
            });

            const blob = new Blob([json], { type: "application/json" });
            formData2.append("data", blob);
            const file = DataURIToBlob("data:image/jpeg;base64," + data.image);
            formData2.append("images", file);

            fetch("http://15.165.161.157:8080/api/command/save", {
              method: "POST",
              body: formData2,
            })
              .then((response) => {
                console.log("Upload date: ", todayDate);
                console.log("DB save done");
              })
              .catch((error) => console.error("Error:", error));
          })
          .catch((error) => console.error("Error:", error)); //ml 서버 처리 에러 메시지
      });
    }
  }, [selectedDate, year, month, day]);

  useEffect(() => {
    if (userData) {
      const getCalendarInfo = async () => {
        for (let m = 1; m <= month; m++) {
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
                formatDay={(locale, date) => moment(date).format("DD")}
                tileContent={({ date, view }) => {
                  let html = [];
                  const formattedDate = moment(date).format("YYYY-MM-DD");

                  if (calendarList.find((x) => x === formattedDate)) {
                    html.push(<div className="dot"></div>);
                  }
                  return (
                    <a
                      href={`/analyze?date=${formattedDate}`}
                      className="dotContainer"
                    >
                      {html}
                    </a>
                  );
                }}
                onClickDay={handleCalendarSelect}
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
