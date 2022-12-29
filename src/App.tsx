import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import Home from "./pages/home";
import Login from "./pages/login";
import { action } from "./redux";
import { token } from "./services/spotify";

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(action.user.setAccessToken(token));
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
      {user.access_token ? <Home /> : <Login />}
    </div>
  );
}

export default App;
