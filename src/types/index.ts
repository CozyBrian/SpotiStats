export interface ISpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
}

export interface ISpotifyArtist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ISpotifyTrack {
  id: string;
  name: string;
  artists: ISpotifyArtist[];
  album: { name: string; images: { url: string }[] };
  duration_ms: number;
}

export interface ISpotifyPlaylist {
  items: {
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
    name: string;
    owner: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string;
        total: number;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
      display_name: string;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }[];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface IFollowedArtists {
  artists: {
    href: string;
    items: any[];
    limit: number;
    next: string;
    cursors: {
      after: string;
    };
    total: number;
  };
}

interface ISpotifyTopItem {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface ISpotifyTopArtists extends ISpotifyTopItem {
  items: ISpotifyArtist[];
}

export interface ISpotifyTopTracks extends ISpotifyTopItem {
  items: ISpotifyTrack[];
}
