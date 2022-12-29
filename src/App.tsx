import React, { useEffect } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NavBar from "./components/navbar";
import { useAppSelector } from "./hooks";
import Error from "./pages/404";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
  const location = useLocation();
  return (
    <div className="w-screen h-screen min-h-full">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.access_token === null) {
      navigate("/login", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
