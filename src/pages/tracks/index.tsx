import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";
import TrackItem from "../../components/trackItem";
import {
  getTopTracksLong,
  getTopTracksMedium,
  getTopTracksShort,
} from "../../services/spotify";
import { ISpotifyTopTracks, timeRangeT } from "../../types";

const Tracks = () => {
  const [tracks, setTracks] = useState<ISpotifyTopTracks | null>(null);
  const [timeRange, setTimeRange] = useState<timeRangeT>("long_term");
  const [isLoading, setIsLoading] = useState(false);

  const timeRangeValues: { label: string; value: timeRangeT }[] = [
    {
      value: "long_term",
      label: "All Time",
    },
    {
      value: "medium_term",
      label: "6 Months",
    },
    {
      value: "short_term",
      label: "4 Weeks",
    },
  ];

  useEffect(() => {
    switch (timeRange) {
      case "long_term":
        setIsLoading(true);
        getTopTracksLong()
          .then((res) => {
            setTracks(res.data);
          })
          .finally(() => setIsLoading(false));
        break;
      case "medium_term":
        getTopTracksMedium()
          .then((res) => {
            setTracks(res.data);
          })
          .finally(() => setIsLoading(false));
        break;
      case "short_term":
        getTopTracksShort()
          .then((res) => {
            setTracks(res.data);
          })
          .finally(() => setIsLoading(false));
        break;
      default:
        break;
    }
  }, [timeRange]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col p-4 md:p-8 lg:p-16"
    >
      <div className="flex w-full flex-col md:flex-row items-center md:items-start justify-between text-white align-baseline">
        <p className="text-white tracking-wider uppercase text-3xl lg:text-5xl font-['CircularStd']">
          Tracks
        </p>
        <div className="flex flex-row gap-4 items-end">
          {timeRangeValues.map((item) => {
            const isSelected = item.value === timeRange;
            return (
              <span
                className={
                  isSelected
                    ? "text-white underline underline-offset-4"
                    : "text-[#b3b3b3]"
                }
                onClick={() => setTimeRange(item.value)}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full mt-16 font-['CircularStd']">
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
          <div className="flex flex-col w-full container gap-2">
            {tracks?.items.map((track) => (
              <TrackItem key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Tracks;
