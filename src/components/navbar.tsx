import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Spotify from "../assets/spotify.svg";
import Microphone from "../assets/icons/microphone";
import Music from "../assets/icons/music";
import IconUser from "../assets/icons/user";
import useDeviceDetect from "../hooks/useMobileDetect";
import "./navbar.tsx";

const NavBar = () => {
  const [isNavOpenM, setIsNavOpenM] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { isMobile } = useDeviceDetect();
  const routes = [
    { title: "Profile", link: "/", Icon: IconUser },
    { title: "Top Artists", link: "/artists", Icon: Microphone },
    { title: "Top Tracks", link: "/tracks", Icon: Music },
  ];

  if (isMobile) {
    return (
      <>
        <div className="absolute p-4 left-0 top-0 opacity-30 z-20">
          <div
            className={`flex flex-row items-center ${
              !isNavOpen && "justify-center"
            } gap-2 pb-6`}
          >
            <img
              onClick={() => setIsNavOpenM(!isNavOpenM)}
              className="w-10"
              src={Spotify}
              alt="white-spotify"
            />
          </div>
        </div>
        <motion.aside
          initial={{ left: 0 }}
          animate={{ left: isNavOpenM ? -280 : 0 }}
          transition={{ stiffness: 500 }}
          style={{ width: "275px" }}
          className={`absolute text-white h-full bg-black p-4 pt-6 shrink-0 z-20`}
        >
          <div className={`flex flex-row items-center gap-2 pb-6`}>
            <img
              onClick={() => setIsNavOpenM(!isNavOpenM)}
              className="w-10"
              src={Spotify}
              alt="white-spotify"
            />
            <p className="font-['CircularStd'] text-3xl flex-nowrap">
              SpotiStats
            </p>
          </div>
          <div className="flex flex-col font-['CircularStd'] gap-1">
            {routes.map((item, _) => (
              <div
                key={`${item.link}-route`}
                onClick={() => setIsNavOpenM(!isNavOpenM)}
              >
                <NavBarItem
                  isNavOpen={true}
                  title={item.title}
                  link={item.link}
                  Icon={item.Icon}
                />
              </div>
            ))}
          </div>
        </motion.aside>
      </>
    );
  } else {
    return (
      <motion.aside
        initial={{ width: "275px" }}
        animate={{ width: isNavOpen ? "275px" : "75px" }}
        transition={{ stiffness: 500 }}
        style={{ width: isNavOpen ? "275px" : "75px" }}
        className={`text-white h-full bg-black p-4 pt-6 shrink-0`}
        // onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <div
          className={`flex flex-row items-center ${
            !isNavOpen && "justify-center"
          } gap-2 pb-6`}
        >
          <img
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="w-10"
            src={Spotify}
            alt="white-spotify"
          />
          {isNavOpen && (
            <p className="font-['CircularStd'] text-3xl flex-nowrap">
              SpotiStats
            </p>
          )}
        </div>
        <div className="flex flex-col font-['CircularStd'] gap-1">
          {routes.map((item, _) => (
            <NavBarItem
              key={`${item.link}-route`}
              isNavOpen={isNavOpen}
              title={item.title}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
        </div>
      </motion.aside>
    );
  }
};

type navItemProps = {
  isNavOpen: boolean;
  title: string;
  link: string;
  Icon: typeof IconUser;
};

const NavBarItem = ({ isNavOpen, title, link, Icon }: navItemProps) => {
  const location = useLocation();

  const isSelected = location.pathname === link;

  return (
    <Link to={link}>
      <div
        className={`flex flex-row w-full h-[43px] overflow-hidden shrink-0 gap-2 ${
          isSelected && "bg-[#181818]"
        } 
        ${!isNavOpen ? "items-center justify-center" : "pl-1"}
        rounded-md`}
      >
        <div className="flex items-center justify-center">
          {/* <NavIcon route={link} isSelected={isSelected} /> */}
          <div className="flex items-center justify-center w-[35px] h-[35px] p-2">
            <Icon fill={isSelected ? "#fff" : "#b3b3b3"} />
          </div>
        </div>
        {isNavOpen && (
          <div
            className={`flex items-center whitespace-nowrap ${
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

// const NavIcon = ({ route = "", isSelected = false }): JSX.Element => {
//   switch (route) {
//     case "/":
//       return <IconUser fill={isSelected ? "#fff" : "#b3b3b3"} />;

//     case "/artists":
//       return <Music fill={isSelected ? "#fff" : "#b3b3b3"} />;

//     case "/tracks":
//       return <Microphone fill={isSelected ? "#fff" : "#b3b3b3"} />;
//     default:
//       return <Microphone fill={isSelected ? "#fff" : "#b3b3b3"} />;
//   }
// };

export default NavBar;
