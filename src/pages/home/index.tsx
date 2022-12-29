import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col p-4 md:p-8 lg:p-16">
      <p className="text-white tracking-wider uppercase text-5xl font-['CircularStd']">
        Profile
      </p>
      <div className="flex flex-row mt-16 font-['CircularStd']">
        <div className="flex flex-col items-center gap-5">
          <div className="w-40 h-40 rounded-full bg-gray-400"></div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-white text-5xl font-bold">CozyBrian</p>
            <p className="text-[#9B9B9B] text-md ">dragon_tesla</p>
          </div>
          <div className="grid grid-cols-3 w-[300px]">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#1CB955] font-bold text-md">1</p>
              <p className="text-[#9B9B9B] font-normal text-xs uppercase tracking-wider">
                Following
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#1CB955] font-bold text-md">1</p>
              <p className="text-[#9B9B9B] font-normal text-xs uppercase tracking-wider">
                Followers
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#1CB955] font-bold text-md">1</p>
              <p className="text-[#9B9B9B] font-normal text-xs uppercase tracking-wider">
                Playlists
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
