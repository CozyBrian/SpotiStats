import React from "react";
import { ISpotifyTrack } from "../types";
import { formatDuration } from "../utils";

const TrackItem = ({ track }: { track: ISpotifyTrack }) => {
  return (
    <div className="spoti_track_container gap-4 text-white">
      <div className="flex w-14 h-14 bg-gray-400 shrink-0 flex-nowrap">
        <img
          className="w-full h-full object-cover"
          src={track.album.images[0].url}
          alt={`${track.id}-profile`}
        />
      </div>
      <div className="spoti_track_meta">
        <div className="spoti_track_album">
          <span className="text-white text-base">{track.name}</span>
          <div className="spoti_track_album text-[#9B9B9B] text-sm">
            {track.artists &&
              track.artists.map(({ name }, i) => (
                <span key={i}>
                  {name}
                  {track.artists.length > 0 && i === track.artists.length - 1
                    ? ""
                    : ","}
                  &nbsp;
                </span>
              ))}
            &nbsp;&middot;&nbsp;&nbsp;
            {track.album.name}
          </div>
        </div>
        <div>
          <p className="text-[#9B9B9B] text-sm">
            {formatDuration(track.duration_ms!)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
