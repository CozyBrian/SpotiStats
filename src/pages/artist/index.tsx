import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
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
      className="flex flex-col items-center justify-center h-full p-4 lg:p-8 xl:p-16 font-[CircularStd] text-2xl text-white"
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
          <div className="flex flex-col lg:flex-row mt-8 md:mt-0 items-center w-full gap-8 h-full rounded-md">
            <div className="flex flex-col gap-4 items-center">
              <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={artist.images[1].url}
                  alt="artist"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full bg-[#282828] rounded-xl p-8">
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
                  <div className="grid grid-tmp-col2 overflow-x-scroll w-full gap-2 pt-1">
                    {topTracks?.tracks.slice(0, 6).map((track) => (
                      <div
                        key={track.id}
                        className="bg-[#121212] min-w-[288px] pr-1"
                      >
                        <TrackItem key={track.id} track={track} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-lg text-[#b3b3b3]">Top Albums:</p>
                <div className="overflow-x-scroll">
                  <div className="flex flex-row gap-2 pt-1">
                    {UniqueAlbums.slice(0, 6).map((album) => (
                      <div
                        key={album.id}
                        className="flex flex-col items-center w-[200px] rounded-xl p-2 bg-[#121212]"
                      >
                        <div className="aspect-square w-full shrink-0">
                          <img
                            className="w-full min-h-[96px] min-w-[96px] aspect-square object-cover rounded-md"
                            src={album.images[1].url}
                            alt="album-art"
                          />
                        </div>
                        <div className="w-full pt-1">
                          <p className="text-base">{album.name}</p>
                        </div>
                      </div>
                    ))}
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
