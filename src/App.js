import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./header/header";
import Loader from "./pages/Loader/loader";
import Main from "./pages/Main/main";
import AnalyzePage from "./pages/Analyze/analyze";
import User from "./pages/User/user";
import Login from "./pages/Login/login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/main" element={<Main />} />
          <Route path="/loading" element={<Loader />} />
          <Route path="/analyze" element={<AnalyzePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
