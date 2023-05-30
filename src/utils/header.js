export const getTitleFromLocation = (location) => {
  if (location === "/main" || location === "/") {
    return "날짜별 음주 현황";
  } else if (location === "/login") {
    return "로그인";
  } else if (location === "/register") {
    return "회원가입";
  } else if (location === "/loading") {
    return "사진 분석중...";
  } else if (location === "/analyze") {
    return "사진 분석 결과";
  } else if (location === "/user") {
    return "전체 통계분석";
  } else {
    return "";
  }
};
