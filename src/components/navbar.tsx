import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Spotify from "../assets/spotify.svg";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const routes = [
    { title: "Profile", link: "/" },
    { title: "Top Artists", link: "/artists" },
    { title: "Top Tracks", link: "/tracks" },
    { title: "Wrapped", link: "/wrapped" },
  ];
  return (
    <aside
      style={{ width: isNavOpen ? "275px" : "75px" }}
      className={`text-white h-full bg-black p-4 pt-6`}
      // onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <div
        className={`flex flex-row items-center ${
          !isNavOpen && "justify-center"
        } gap-2 pb-6`}
      >
        <img className="w-10" src={Spotify} alt="white-spotify" />
        {isNavOpen && (
          <p className="font-['CircularStd'] text-3xl">SpotiStats</p>
        )}
      </div>
      <div className="flex flex-col font-['CircularStd'] gap-1">
        {routes.map((item, _) => (
          <NavBarItem
            key={`${item.link}-route`}
            isNavOpen={isNavOpen}
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
    </aside>
  );
};

const NavBarItem = ({ isNavOpen = false, title = "", link = "" }) => {
  const location = useLocation();

  const isSelected = location.pathname === link;

  return (
    <Link to={link}>
      <div
        className={`flex flex-row w-full h-[43px] gap-2 ${
          isSelected && "bg-[#181818]"
        } rounded-md`}
      >
        <div className="flex items-center justify-center"></div>
        {isNavOpen && (
          <div
            className={`flex items-center ${
              isSelected ? "text-white" : "text-[#b3b3b3]"
            } h-full duration-200`}
          >
            {title}
          </div>
        )}
      </div>
    </Link>
  );
};

export default NavBar;
