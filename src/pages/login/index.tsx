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
  }, []);

  const LoginURL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3001/v1/auth/login"
      : "/login";

  return (
    <div>
      <p className="text-green-600 text-7xl">THIS IS SPOTISTAT</p>
      <a href={LoginURL} className="px-3 py-1 bg-green-500">
        LogIn
      </a>
    </div>
  );
};

export default Login;
