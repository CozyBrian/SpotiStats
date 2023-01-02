import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ISpotifyTrack } from "../../types";
import { getTrack } from "../../services/spotify";
import { Oval } from "react-loader-spinner";
import { getYear } from "../../utils";
import Img from "../../components/Img";

const Track = () => {
  const { id } = useParams();
  const [track, setTrack] = useState<ISpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTrack(id!)
      .then((res) => {
        setTrack(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center min-h-screen p-4 lg:p-8 xl:p-16 font-[CircularStd] text-2xl text-white"
    >
      {isLoading ? (
        <div className="absolute left-[50%] top-[50%] -translate-x-8 -translate-y-8">
          <Oval
            height={64}
            width={64}
            strokeWidth={4}
            color="#1CB955"
            secondaryColor="rgba(255, 255, 255, 0.49)"
          />
        </div>
      ) : (
        track && (
          <div className="w-full h-full">
            <div className="flex flex-col items-center pt-16 md:flex-row md:items-start md:pt-0 gap-8">
              <div className="h-[250px] w-[250px] bg-[#282828] shadow-xl">
                <Img
                  className="h-full w-full object-cover"
                  src={track.album.images[1].url}
                  alt="album"
                />
              </div>
              <div className="flex flex-col md:items-start items-center gap-3 py-4">
                <p className="text-4xl font-bold text-center md:text-start text-white">
                  {track.name}
                </p>
                <p className="text-2xl font-semibold text-[#b3b3b3]">
                  {track.artists[0].name}
                </p>
                <p className="text-base text-[#9B9B9B]">
                  <a
                    href={track.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.album.name}
                  </a>{" "}
                  &middot; {getYear(track.album.release_date)}
                </p>
                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={track.external_urls.spotify}
                    className="text-white px-6 py-2.5 text-xs rounded-full uppercase spoti_button duration-200 tracking-wider cursor-pointer"
                  >
                    Play On Spotify
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </motion.div>
  );
};

export default Track;
