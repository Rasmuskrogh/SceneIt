import { createContext } from "react";
import { IMovies } from "../../interfaces";

export const NewMoviesContext = createContext<{
  movies: IMovies[];
  likedMovies: IMovies[];
  dislikedMovies: IMovies[];
  seenMovies: IMovies[];
  addMovieToLikedMovies: (movieId: string | undefined) => Promise<void>;
  addMovieToSeenMovies: (movieId: string | undefined) => Promise<void>;
  addMovieToDislikedMovies: (movieId: string | undefined) => Promise<void>;
}>({
  movies: [],
  likedMovies: [],
  dislikedMovies: [],
  seenMovies: [],
  addMovieToDislikedMovies: async (/* movieId: string | undefined */) => {},
  addMovieToSeenMovies: async (/* movieId: string | undefined */) => {},
  addMovieToLikedMovies: async (/* movieId: string | undefined */) => {},
});
