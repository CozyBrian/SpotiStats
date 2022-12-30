import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import useDeviceDetect from "../../hooks/useMobileDetect";
import {
  getTopArtistsLong,
  getTopArtistsMedium,
  getTopArtistsShort,
} from "../../services/spotify";
import { ISpotifyTopArtists, timeRangeT } from "../../types";

const Artists = () => {
  const [topArtists, setTopArtists] = useState<ISpotifyTopArtists | null>(null);
  const [timeRange, setTimeRange] = useState<timeRangeT>("long_term");
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    switch (timeRange) {
      case "long_term":
        setIsLoading(true);
        getTopArtistsLong()
          .then((res) => {
            setTopArtists(res.data);
          })
          .finally(() => setIsLoading(false));
        break;
      case "medium_term":
        getTopArtistsMedium()
          .then((res) => {
            setTopArtists(res.data);
          })
          .finally(() => setIsLoading(false));
        break;
      case "short_term":
        getTopArtistsShort()
          .then((res) => {
            setTopArtists(res.data);
          })
          .finally(() => setIsLoading(false));
        break;
      default:
        break;
    }
  }, [timeRange]);

  return (
    <div className="flex items-center md:items-start flex-col p-4 md:p-8 lg:p-16">
      <p className="text-white tracking-wider uppercase text-3xl lg:text-5xl font-['CircularStd']">
        Artists
      </p>
      <div className="flex justify-center items-center w-full h-full mt-16 font-['CircularStd']">
        {
          <div className={`grid grid-tmp-col ${isMobile && "m"} w-full`}>
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
              topArtists?.items.map((artist) => (
                <div
                  key={artist.id}
                  className="flex flex-col items-center gap-4 mt-8"
                >
                  <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={artist.images[2].url}
                      alt="artist"
                    />
                  </div>
                  <div>
                    <p className="text-white text-base md:text-xl">
                      {artist.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Artists;
