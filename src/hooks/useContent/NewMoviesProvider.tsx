import { useEffect, useState } from "react";
import { NewMoviesContext } from "./NewMoviesContext";
import { IMovies } from "../../interfaces";
import {
  getDislikedMovies,
  getLikedMovies,
  getMovies,
  getSeenMovies,
  postDislikedMovies,
  postLikedMovies,
  postSeenMovies,
} from "../../requests";

function NewMoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<IMovies[]>([]);
  const [likedMovies, setLikedMovies] = useState<IMovies[]>([]);
  const [seenMovies, setSeenMovies] = useState<IMovies[]>([]);

  const addMovieToDislikedMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        const values = await Promise.all([
          postDislikedMovies(movieId),
          getDislikedMovies(),
        ]);
        console.log("what is value[1]?", values[1].data);
        setDislikedMovies(await values[1].data);
      } catch (error) {
        console.log(error);
      }
  };
  const addMovieToLikedMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        const values = await Promise.all([
          postLikedMovies(movieId),
          getLikedMovies(),
        ]);
        console.log(values[1].data);
        setLikedMovies(values[1].data);
      } catch (error) {
        console.log(error);
      }
  };

  const addMovieToSeenMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        const values = await Promise.all([
          postSeenMovies(movieId),
          getSeenMovies(),
        ]);
        console.log(values[1].data);
        setSeenMovies(values[1].data);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      const dislikedMoviesData = await getDislikedMovies();
      const likedMoviesData = await getLikedMovies();
      const SeenMoviesData = await getSeenMovies();
      setDislikedMovies(dislikedMoviesData.data);
      setSeenMovies(SeenMoviesData.data);
      setLikedMovies(likedMoviesData.data);
      setMovies(moviesData.data);
    };
    fetchMovies();
  }, []);

  return (
    <NewMoviesContext.Provider
      value={{
        movies,
        dislikedMovies,
        likedMovies,
        seenMovies,
        addMovieToDislikedMovies,
        addMovieToLikedMovies,
        addMovieToSeenMovies,
      }}
    >
      {children}
    </NewMoviesContext.Provider>
  );
}

export default NewMoviesProvider;
