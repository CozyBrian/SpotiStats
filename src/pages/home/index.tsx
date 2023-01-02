import axios from "axios";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";
import TrackItem from "../../components/trackItem";
import {
  getFollowing,
  getMinTopArtistsLong,
  getMinTopTracksLong,
  getPlaylists,
  getUser,
  logoutUser,
} from "../../services/spotify";
import {
  IFollowedArtists,
  ISpotifyPlaylist,
  ISpotifyTopArtists,
  ISpotifyTopTracks,
  ISpotifyUser,
} from "../../types";
import { Link } from "react-router-dom";
import Img from "../../components/Img";

const Home = () => {
  const [user, setUser] = useState<ISpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<ISpotifyPlaylist | null>(null);
  const [following, setFollowing] = useState<IFollowedArtists | null>(null);
  const [topArtists, setTopArtists] = useState<ISpotifyTopArtists | null>(null);
  const [topTracks, setTopTracks] = useState<ISpotifyTopTracks | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      )
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center md:items-start p-4 md:p-8 lg:p-16"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-white tracking-wider uppercase text-3xl md:text-3xl xl:text-5xl font-['CircularStd']">
          Profile
        </p>
        <button
          onClick={() => logoutUser()}
          className="text-white px-6 py-2 hover:font-bold text-sm rounded-full border border-white hover:bg-white hover:text-black uppercase duration-200 tracking-wider"
        >
          LogOut
        </button>
      </div>
      <div className="flex flex-col w-full min-h-screen lg:flex-row gap-8 mt-16 font-['CircularStd']">
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
          user && (
            <>
              <div className="flex flex-col items-center gap-5">
                <div className="w-40 h-40 rounded-full bg-[#282828] overflow-hidden">
                  {user.images.length > 0 ? (
                    <Img
                      className="w-full h-full rounded-full"
                      src={user.images[0].url}
                      alt="avatar"
                    />
                  ) : (
                    <Img
                      className="w-full h-full rounded-full"
                      src={`https://avatars.dicebear.com/api/initials/${user.display_name}.svg`}
                      alt="avatar"
                    />
                  )}
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-white text-5xl font-bold">
                    {user!.display_name}
                  </p>
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
                  <div className="flex flex-col items-center w-full my-10 md:my-0">
                    <p className="text-white text-xl font-bold">
                      Your Top Artists
                    </p>
                    <span className="w-20 border-b-2 border-b-[#1CB955] pt-2" />
                  </div>
                  <div className="flex flex-col p-4 md:p-12 gap-4">
                    {topArtists?.items.map((artist) => (
                      <Link key={artist.id} to={`/artists/${artist.id}`}>
                        <div className="flex flex-row gap-4">
                          <div className="flex w-14 h-14 bg-[#282828] rounded-full shrink-0">
                            <Img
                              className="w-full h-full rounded-full object-cover"
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
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex flex-col items-center my-10 md:my-0 w-full">
                    <p className="text-white text-xl font-bold">
                      Your Top Tracks
                    </p>
                    <span className="w-20 border-b-2 border-b-[#1CB955] pt-2" />
                  </div>
                  <div className="flex flex-col p-4 md:p-12 gap-4">
                    {topTracks?.items.map((track) => (
                      <Link key={track.id} to={`/tracks/${track.id}`}>
                        <TrackItem track={track} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Home;
