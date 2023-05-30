import "./header.element.css";
import { getTitleFromLocation } from "../utils/header";
import { useLocation } from "react-router-dom";

//const location = window.location.pathname;

const Header = () => {
  const location = useLocation();
  const title = getTitleFromLocation(location.pathname);

  return (
    <div className="headerContainer">
      <a href="/" className="headerMaintext">
        Drinkare 음주일정관리
      </a>
      <div className="headerSubtext">{title}</div>
    </div>
  );
};

export default Header;
