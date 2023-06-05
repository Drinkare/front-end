import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./header/header";
import Loader from "./pages/Loader/loader";
import Main from "./pages/Main/main";
import AnalyzePage from "./pages/Analyze/analyze";
import User from "./pages/User/user";
import Login from "./pages/Login/login";
// import Kakao from "./pages/Kakao/kakao";
import { USER_DATA } from "./constants/auth";

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem(USER_DATA)));
  }, [localStorage]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={userData ? <Main /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User userData={userData} />} />
          <Route path="/main" element={<Main userData={userData} />} />
          <Route path="/loading" element={<Loader />} />
          <Route
            path="/analyze"
            element={<AnalyzePage userData={userData} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
