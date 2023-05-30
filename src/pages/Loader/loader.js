import { useNavigate } from "react-router-dom";
import Custombutton from "../../component/custombutton/custombutton";
import "./loader.element.css";
import { useEffect } from "react";
const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/analyze");
    }, 5000);
  }, []);
  return (
    <div className="loaderDiv">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
      </div>
      <div className="loaderTextContainer">
        <div className="loaderMaintext">사진을 분석중입니다.</div>
        <div className="loaderSubtext">
          1분 이내로 완료되니 조금만 기다려주세요.
        </div>
      </div>
    </div>
  );
};

export default Loader;
