export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  production_companies?: Production[];
  vote_average?: number;
  genre_ids?: number[];
  runtime?: number;
  homepage?: string;
  genres?: Genres[];
  release_date?: string;
  backdrop_path?: string;
  overview?: string;
}

export interface Production {
  id: number;
  name: string;
}

export interface Genres {
  id: number;
  name: string;
}
