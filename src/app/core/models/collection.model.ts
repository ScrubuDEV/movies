import { Movie } from "./movie.model";

export interface CollectionSummary {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface CollectionSearchResponse {
  page: number;
  results: CollectionSummary[];
  total_results: number;
  total_pages: number;
}

export interface LocalCollection {
  id: string; // String for local IDs
  title: string;
  description: string;
  movie_ids: number[]; // Array of Movie IDs (renamed from 'movies' for clarity)
  movies?: Movie[]; // Optional full movie data for display
}
