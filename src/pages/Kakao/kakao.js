import React from "react";
import { useDispatch } from "react-redux";
import { Container, Grid, Text } from "../Elements";
import { actionCreators as userActions } from "../Redux/Modules/User";

const Kakao = (props) => {
  const dispatch = useDispatch();

  const href = window.location.href;
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");

  React.useEffect(async () => {
    await dispatch(userActions.kakaoLogin(code));
  }, []);

  return (
    <Container>
      <Grid>
        <Text>잠시만 기다려 주세요! 로그인 중입니다.</Text>
      </Grid>
    </Container>
  );
};

export default Kakao;
