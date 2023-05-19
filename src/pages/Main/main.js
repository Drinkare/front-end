import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import { InputHTMLAttributes } from "react";
import "./main.element.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const mark = ["2023-05-15", "2023-05-12", "2023-05-10"];

const Main = () => {
  const [value, onChange] = useState(new Date());

  const navigate = useNavigate();

  const handleCameraClick1 = useCallback(() => {
    let fileId = Date.now();
    let fileInput = document.createElement("input"); // document 아래 input 태그 생성 - type input
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
    if (fileInput !== null) {
      fileInput.addEventListener("change", () => {
        //input tag에 데이터 들어왔을 때 실행되는 함수
        if (fileInput.files == null) return;
        const fileReader = new FileReader(); //File 을 주고 받을때에는 FileReader에 주고 받음
        fileReader.readAsDataURL(fileInput.files[0]);
        fileReader.onload = function (event) {
          if (event.target == null) return;
          const fileContent = event.target.result;
          if (!fileInput.files) console.log(fileContent);
          else {
            //이제 파일이 들어온경우-> 백으로-> ML 알괴고리즘 돌리고-> 그 결과를 DB에 저장?
            //백에서 json 데이터 읽어와서?
            //ML이 데이터 변환해서 프론트한테 보내주면
            //그 정보를 다시 백한테 보내준다
          }
        };
      });
    }
  }, []);
  return (
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
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(<div className="dot"></div>);
            }

            return <div className="dotContainer">{html}</div>;
          }}
        />
      </div>

      <div className="navigatorBar">
        <div>
          <FontAwesomeIcon
            icon={faCalendar}
            size="2x"
            color="white"
            className="iconContent"
          />
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
  );
};

export default Main;
