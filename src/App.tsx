import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/navbar";
import { useAppSelector } from "./hooks";
import Error from "./pages/404";
import Home from "./pages/home";
import Login from "./pages/login";
import "./app.css";
import Artists from "./pages/artists";
import Tracks from "./pages/tracks";
import Wrapped from "./pages/wrapped";

function App() {
  const location = useLocation();
  return (
    <div className="w-screen h-screen min-h-full">
      <div className="flex flex-row h-full w-full">
        {location.pathname !== "/login" && <NavBar />}
        <div className="flex-grow">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="artists"
              element={
                <ProtectedRoute>
                  <Artists />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracks"
              element={
                <ProtectedRoute>
                  <Tracks />
                </ProtectedRoute>
              }
            />
            <Route
              path="wrapped"
              element={
                <ProtectedRoute>
                  <Wrapped />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

interface props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: props) => {
  const user = useAppSelector((state) => state.user);
  if (user.access_token === null) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

// const ProtectedRoutes = () => {
//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.user);

//   useEffect(() => {
//     if (user.access_token === null) {
//       navigate("/login", { replace: true });
//     }
//   }, [navigate, user.access_token]);

//   return (
//     <div className="flex flex-row w-full h-full">
//       <NavBar />
//       <div className="flex-grow">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

export default App;
