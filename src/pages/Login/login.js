import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./login.element.css";

import kakaoLogo from "../../assets/kakao_login_medium_narrow.png";
import kakaoIcon from "../../assets/KakaoTalk_icon.png";

import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  // 카카오 로그인 함수를 실행시키면 아래에 설정해 놓은 KAKAO_AUTH_URL 주소로 이동한다.
  // 이동 된 창에서 kakao 계정 로그인을 시도할 수 있으며 로그인 버튼 클릭 시 Redirect URI로 이동하면서 빈 화면과 함게 인가코드가 발급된다.(인가코드는 파라미터 값에 들어가 있다!)
  const REST_API_KEY = "532d7168dd0821f3756ea1293ba8dea4";
  const REDIRECT_URI = "http://localhost:3000/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/login/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <React.Fragment>
      <div className="kakaoLoginContainer">
        <img src={kakaoIcon} className="kakaoLogoIcon" />
        <button className="loginBtn" onClick={kakaoLogin}>
          <img src={kakaoLogo} />
        </button>
      </div>
      {/* 로그인 성공된 담에 ./main화면으로 이동해야힘 */}
    </React.Fragment>
  );
};

export default Login;
