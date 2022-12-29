import React from "react";

const Login = () => {
  const LoginURL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3001/v1/auth/login"
      : "https://spotify-profile.herokuapp.com/login";

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
