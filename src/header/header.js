import "./header.element.css";
const Header = () => {
  let subTextValue;
  const currentLoc = window.location.pathname;
  if (currentLoc === "/main") {
    subTextValue = "날짜별 음주 현황";
  } else if (currentLoc === "/login") {
    subTextValue = "로그인";
  } else if (currentLoc === "/register") {
    subTextValue = "회원가입";
  } else if (currentLoc === "/loading") {
    subTextValue = "사진 분석중...";
  } else if (currentLoc === "/analyze") {
    subTextValue = "사진 분석 결과";
  } else if (currentLoc === "/user") {
    subTextValue = "전체 통계분석";
  }
  return (
    <div className="headerContainer">
      <div className="headerMaintext">Drinkare 음주일정관리</div>
      <div className="headerSubtext">{subTextValue}</div>
    </div>
  );
};

export default Header;
