import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const Login = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.access_token) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LoginURL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3001/v1/auth/login"
      : "https://spotistatsserver.render.com/v1/auth/login";

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4 font-['CircularStd']">
      <p className="text-white text-3xl font-['CircularStd']">
        Welcome to SpotiStats
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={LoginURL}
        className={`text-white px-9 py-4 text-base rounded-full uppercase spoti_button duration-200 tracking-wider`}
      >
        SignIn with Spotify
      </a>
    </div>
  );
};

export default Login;
