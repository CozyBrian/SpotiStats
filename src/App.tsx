import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/navbar";
import { useAppSelector } from "./hooks";
import Error from "./pages/404";
import Home from "./pages/home";
import Login from "./pages/login";
import Artists from "./pages/artists";
import Tracks from "./pages/tracks";
import Wrapped from "./pages/wrapped";
import { AnimatePresence } from "framer-motion";
import Artist from "./pages/artist";
import Track from "./pages/track";

function App() {
  const location = useLocation();
  return (
    <div className="relative w-screen md:h-screen">
      <div className="flex flex-row h-full max-screen overflow-hidden">
        {/* <div className="fixed top-0 left-0 h-screen"> */}
        {location.pathname !== "/login" && <NavBar />}
        {/* </div> */}
        <div className="relative w-full overflow-y-scroll">
          <AnimatePresence mode="wait">
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
                path="/artists/:id"
                element={
                  <ProtectedRoute>
                    <Artist />
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
                path="/tracks/:id"
                element={
                  <ProtectedRoute>
                    <Track />
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
          </AnimatePresence>
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

export default App;
