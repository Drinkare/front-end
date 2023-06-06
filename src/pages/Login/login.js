import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./login.element.css";
import { useEffect } from "react";
import kakaoLogo from "../../assets/kakao_login_medium_narrow.png";
import kakaoIcon from "../../assets/KakaoTalk_icon.png";
import drinkareIcon from "../../assets/drinkare_logo.jpg";

import React, { useState } from "react";
import axios from "axios";
import { USER_DATA } from "../../constants/auth";

const Login = () => {
  const navigate = useNavigate();
  // 카카오 로그인 함수를 실행시키면 아래에 설정해 놓은 KAKAO_AUTH_URL 주소로 이동한다.
  // 이동 된 창에서 kakao 계정 로그인을 시도할 수 있으며 로그인 버튼 클릭 시 Redirect URI로 이동하면서 빈 화면과 함게 인가코드가 발급된다.(인가코드는 파라미터 값에 들어가 있다!)
  const REST_API_KEY = "532d7168dd0821f3756ea1293ba8dea4";
  // const REDIRECT_URI = "http://localhost:3000/login";
  const REDIRECT_URI = "https://drinkare.netlify.app/";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/login/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const href = new URL(window.location.href);
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  useEffect(() => {
    if (code) {
      console.log("code:", code);
      console.log("exists");
      fetch(`http://15.165.161.157:8080/login/kakao?code=${code}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("result", result);
          localStorage.setItem(USER_DATA, JSON.stringify(result));
          navigate("/main");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="kakaoLoginContainer">
        <button className="loginBtn" onClick={kakaoLogin}>
          <img src={kakaoLogo} />
        </button>
      </div>
      {/* 로그인 성공된 담에 ./main화면으로 이동해야힘 */}
    </React.Fragment>
  );
};

export default Login;
