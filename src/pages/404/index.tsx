import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>Ops 404</h1>
      <Link to="/">GO TO Home</Link>
    </div>
  );
};

export default Error;
