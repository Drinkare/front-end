import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./login.element.css";

import KakaoLogin from "react-kakao-login";

import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        // 인증 성공 시 처리할 로직
        const accessToken = authObj.access_token;
        setIsLoggedIn(true);
        getUserInfo(accessToken);
      },
      fail: (error) => {
        // 인증 실패 시 처리할 로직
        console.log(error);
      },
    });
  };

  const getUserInfo = (accessToken) => {
    axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        // 사용자 정보를 가져온 후 처리할 로직
        console.log(response.data);
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
      });
  };

  return (
    <div className="loginContainer">
      {isLoggedIn ? (
        <div>
          <p>로그인되었습니다!</p>
          {/* 여기에 로그인 후 사용자 정보를 표시할 수 있습니다. */}
        </div>
      ) : (
        <button className="loginBtn" onClick={handleLogin}>
          카카오톡으로 로그인
        </button>
      )}
    </div>
  );
};

export default Login;
