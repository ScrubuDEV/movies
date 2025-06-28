import { Movie } from './movie.model';

export interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface MovieDetail extends Movie {
  budget: number;
  revenue: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  spoken_languages: SpokenLanguage[];
}

export interface RatingResponse {
  status_code: number;
  status_message: string;
}
