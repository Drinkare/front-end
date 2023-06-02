import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import { Link } from "react-router-dom";

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

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://3.26.39.50:8000/upload_image", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        // 이미지 업로드 성공
        console.log("이미지 업로드 성공");
        // 응답 처리
        // ...
      } else {
        console.error("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  // const handleCameraClick1 = useCallback(() => {
  //   let fileId = Date.now();
  //   let fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.accept = "image/*";
  //   fileInput.click();

  //   if (fileInput !== null) {
  //     fileInput.addEventListener("change", () => {
  //       if (fileInput.files == null) return;

  //       const file = fileInput.files[0];
  //       const formData = new FormData();
  //       formData.append("image", file, file.name);
  //       console.log(formData);
  //       fetch("http://3.26.39.50:8000/upload_image", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "multipart/form-data", // 수정된 부분
  //         },
  //         body: formData,
  //       })
  //         .then((response) => {
  //           if (response.ok) {
  //             console.log("파일 업로드 성공");
  //           } else {
  //             console.error("파일 업로드 실패");
  //           }
  //         })
  //         .then((result) => {
  //           console.log(result);
  //         })
  //         .catch((error) => {
  //           console.error("파일 업로드 실패:", error);
  //         });
  //     });
  //   }
  // }, []);

  // const handleCameraClick1 = useCallback(() => {
  //   let fileId = Date.now();
  //   let fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.accept = "image/*";
  //   fileInput.click();

  //   if (fileInput !== null) {
  //     fileInput.addEventListener("change", () => {
  //       if (fileInput.files == null) return;

  //       const file = fileInput.files[0];
  //       const formData = new FormData();
  //       formData.append("image", file, file.name);

  //       fetch("http://3.26.39.50:8000/upload_image", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "multipart/form-data", // 수정된 부분
  //         },
  //         body: formData,
  //       })
  //         .then((response) => response)
  //         .then((result) => {
  //           // 파일 업로드 성공 후 처리
  //           console.log(result);
  //         })
  //         .catch((error) => {
  //           // 파일 업로드 실패 처리
  //           console.error("파일 업로드 실패:", error);
  //         });
  //     });
  //   }
  // }, []);

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
          console.log(fileContent);
          if (!fileInput.files) console.log(fileContent);
          else {
            console.log(typeof fileContent);
            uploadImage(fileContent);

            fetch("http://3.26.39.50:8000/upload_image", {
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data", // 수정된 부분
              },
              body: { file: fileContent },
            })
              .then((response) => {
                if (response.ok) {
                  console.log("파일 업로드 성공");
                } else {
                  console.error("파일 업로드 실패");
                }
              })
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error("파일 업로드 실패:", error);
              });

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
            const formattedDate = moment(date).format("YYYY-MM-DD");

            if (mark.find((x) => x === formattedDate)) {
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

      <div className="navigatorBar">
        <a href="/">
          <FontAwesomeIcon
            icon={faCalendar}
            size="2x"
            color="white"
            className="iconContent"
          />
        </a>
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
