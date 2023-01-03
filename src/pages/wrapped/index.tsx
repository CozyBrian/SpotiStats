import React, { useEffect } from "react";
import { getPlayedYear } from "../../services/spotify";

const Wrapped = () => {
  useEffect(() => {
    getPlayedYear().then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className="">
      <div className="p-16">
        <p className="text-white tracking-wider uppercase text-5xl font-['CircularStd']">
          Wrapped
        </p>
      </div>
    </div>
  );
};

export default Wrapped;
