import { createContext } from "react";
import { IMovies, IMinimizeMovies } from "../../interfaces";

export const NewMoviesContext = createContext<{
  movies: IMovies[];
  likedMovies: IMinimizeMovies[];
  dislikedMovies: IMinimizeMovies[];
  seenMovies: IMinimizeMovies[];
  addMovieToLikedMovies: (movieId: string | undefined, IMDBId: string | undefined) => Promise<void>;
  addMovieToSeenMovies: (movieId: string | undefined, IMDBId: string | undefined) => Promise<void>;
  addMovieToDislikedMovies: (movieId: string | undefined, IMDBId: string | undefined) => Promise<void>;
  resetAllLists: () => Promise<void>;
  moveToDisliked: (
    movieId: string | undefined,
    ActiveButton: number | undefined
  ) => void;
  moveToLiked: (
    movieId: string | undefined,
    ActiveButton: number | undefined
  ) => void;
  moveToSeen: (
    movieId: string | undefined,
    ActiveButton: number | undefined
  ) => void;
}>({
  movies: [],
  likedMovies: [],
  dislikedMovies: [],
  seenMovies: [],
  addMovieToDislikedMovies: async (/* movieId: string | undefined */) => {},
  addMovieToSeenMovies: async (/* movieId: string | undefined */) => {},
  addMovieToLikedMovies: async (/* movieId: string | undefined */) => {},
  resetAllLists: async () => {},
  moveToDisliked: async () => {},
  moveToLiked: async () => {},
  moveToSeen: async () => {},
});
