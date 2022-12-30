import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  getFollowing,
  getMinTopArtistsLong,
  getMinTopTracksLong,
  getPlaylists,
  getUser,
} from "../../services/spotify";
import {
  IFollowedArtists,
  ISpotifyPlaylist,
  ISpotifyTopArtists,
  ISpotifyTopTracks,
  ISpotifyTrack,
  ISpotifyUser,
} from "../../types";
import { formatDuration } from "../../utils";

const Home = () => {
  const [user, setUser] = useState<ISpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<ISpotifyPlaylist | null>(null);
  const [following, setFollowing] = useState<IFollowedArtists | null>(null);
  const [topArtists, setTopArtists] = useState<ISpotifyTopArtists | null>(null);
  const [topTracks, setTopTracks] = useState<ISpotifyTopTracks | null>(null);

  useEffect(() => {
    axios
      .all([
        getUser(),
        getPlaylists(),
        getFollowing(),
        getMinTopArtistsLong(),
        getMinTopTracksLong(),
      ])
      .then(
        axios.spread((user, playlists, following, top_artists, top_tracks) => {
          setUser(user.data);
          setPlaylists(playlists.data);
          setFollowing(following.data);
          setTopArtists(top_artists.data);
          setTopTracks(top_tracks.data);
        })
      );
  }, []);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-4 md:p-8 lg:p-16">
      <p className="text-white tracking-wider uppercase text-5xl font-['CircularStd']">
        Profile
      </p>
      <div className="flex flex-row mt-16 font-['CircularStd']">
        <div className="flex flex-col items-center gap-5">
          <div className="w-40 h-40 rounded-full bg-gray-400"></div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-white text-5xl font-bold">{user.display_name}</p>
            <p className="text-[#9B9B9B] text-base ">{user.id}</p>
          </div>
          <div className="grid grid-cols-3 w-[300px]">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#1CB955] font-bold text-base">
                {user.followers.total}
              </p>
              <p className="text-[#9B9B9B] font-normal text-xs uppercase tracking-wider">
                Followers
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#1CB955] font-bold text-base">
                {following?.artists.items.length}
              </p>
              <p className="text-[#9B9B9B] font-normal text-xs uppercase tracking-wider">
                Following
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#1CB955] font-bold text-base">
                {playlists?.total}
              </p>
              <p className="text-[#9B9B9B] font-normal text-xs uppercase tracking-wider">
                Playlists
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row flex-grow">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col items-center w-full">
              <p className="text-white text-xl font-bold">Your Top Artists</p>
              <span className="w-20 border-b-2 border-b-[#1CB955] pt-2" />
            </div>
            <div className="flex flex-col p-12 gap-4">
              {topArtists?.items.map((artist) => (
                <div key={artist.id} className="flex flex-row gap-4">
                  <div className="flex w-14 h-14 bg-gray-400 rounded-full shrink-0">
                    <img
                      className="w-full h-full rounded-full"
                      src={artist.images[2].url}
                      alt={`${artist.id}-profile`}
                    />
                  </div>
                  <div className="flex h-full items-center shrink-0">
                    <p className="text-white text-xl flex-nowrap">
                      {artist.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col items-center w-full">
              <p className="text-white text-xl font-bold">Your Top Tracks</p>
              <span className="w-20 border-b-2 border-b-[#1CB955] pt-2" />
            </div>
            <div className="flex flex-col p-12 gap-4">
              {topTracks?.items.map((track) => (
                <TrackItem key={track.id} track={track} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackItem = ({ track }: { track: ISpotifyTrack }) => {
  return (
    <div className="spoti_track_container gap-4 text-white">
      <div className="flex w-14 h-14 bg-gray-400 shrink-0 flex-nowrap">
        <img
          className="w-full h-full"
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

export default Home;
