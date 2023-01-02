import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
} from "../../services/spotify";
import {
  ISpotifyAlbum,
  ISpotifyArtist,
  ISpotifyArtistAlbums,
  ISpotifyArtistTopTracks,
} from "../../types";
import { formatWithCommas } from "../../utils";
import axios from "axios";
import TrackItem from "../../components/trackItem";
import Img from "../../components/Img";

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState<ISpotifyArtist | null>(null);
  const [topTracks, setTracks] = useState<ISpotifyArtistTopTracks | null>(null);
  const [latestAlbums, setAlbums] = useState<ISpotifyArtistAlbums | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .all([getArtist(id!), getArtistTopTracks(id!), getArtistAlbums(id!)])
      .then(
        axios.spread((user, top_tracks, albums) => {
          setArtist(user.data);
          setTracks(top_tracks.data);
          setAlbums(albums.data);
        })
      )
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let UniqueAlbums: ISpotifyAlbum[] = [];

  const UniqueArr = [...new Set(latestAlbums?.items.map((item) => item.name))];

  UniqueArr.forEach((name) => {
    const uIndex = latestAlbums?.items.findIndex((item) => item.name === name);
    UniqueAlbums.push(latestAlbums?.items[uIndex!]!);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 lg:p-8 xl:p-16 font-[CircularStd] text-2xl text-white"
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
        artist && (
          <div className="grid-auto-max xl h-full w-full">
            <div className="flex flex-col gap-4 justify-center m-16 xl:m-0 items-center">
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                <Img
                  className="w-full h-full object-cover rounded-full"
                  src={artist.images[1].url}
                  alt="artist"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-4 h-full bg-[#282828] rounded-xl p-8">
                <p className="text-5xl">{artist?.name}</p>
                <div>
                  <p className="text-lg text-[#b3b3b3]">Followers:</p>
                  <p className="text-2xl">
                    {formatWithCommas(artist.followers.total!)}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-[#b3b3b3]">Genre:</p>
                  <p className="text-xl flex flex-row gap-4 flex-wrap">
                    {artist.genres.map((genre, i) => (
                      <span
                        key={`genre-${i}`}
                        className="px-3 py-1 bg-[#9B9B9B] hover:bg-[#1CB955] text-black hover:text-white rounded-full duration-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-[#b3b3b3]">Popularity:</p>
                  <p className="text-2xl">{artist.popularity}%</p>
                </div>
                <div>
                  <p className="text-lg text-[#b3b3b3]">Top Tracks:</p>
                  <div className="w-full overflow-x-scroll">
                    <div className="grid grid-cols-3 overflow-x-scroll w-full gap-2 pt-1">
                      {topTracks?.tracks.slice(0, 6).map((track) => (
                        <Link
                          to={`/tracks/${track.id}`}
                          key={track.id}
                          className="bg-[#121212] min-w-[200px] pr-1"
                        >
                          <TrackItem key={track.id} track={track} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-[860px] lg:max-w-[1120px]">
                  <p className="text-lg text-[#b3b3b3]">Top Albums:</p>
                  <div className="overflow-auto w-[inherit]">
                    <div className="flex flex-row gap-2 pt-1">
                      {UniqueAlbums.slice(0, 6).map((album) => (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={album.external_urls.spotify}
                          key={album.id}
                          className="flex flex-col items-center w-[150px] rounded-xl bg-[#121212]"
                        >
                          <div className="aspect-square w-[150px] p-2 shrink-0">
                            <Img
                              className="w-full min-h-full min-w-full aspect-square object-cover rounded-md"
                              src={album.images[1].url}
                              alt="album-art"
                            />
                          </div>
                          <div className="w-full pt-1">
                            <p className="text-base truncate">{album.name}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </motion.div>
  );
};

export default Artist;
