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
  const REST_API_KEY = "532d7168dd0821f3756ea1293ba8dea4";
  // const REDIRECT_URI = "http://localhost:3000/login";
  const REDIRECT_URI =
    window.location.hostname === "localhost"
      ? "http://localhost:3000/login"
      : "https://drinkare.netlify.app";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
      let url =
        window.location.hostname === "localhost"
          ? "http://15.165.161.157:8080"
          : "/api_be";

      fetch(`${url}/login/kakao?code=${code}`, {
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
