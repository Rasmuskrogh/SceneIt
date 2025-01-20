import { useEffect, useState } from "react";
import { NewMoviesContext } from "./NewMoviesContext";
import { IMovie, IMovies, IMinimizeMovies } from "../../interfaces";
import {
  getDislikedMovies,
  getLikedMovies,
  getMovies,
  getSeenMovies,
  postDislikedMovies,
  postLikedMovies,
  postSeenMovies,
  deleteMovie,
} from "../../requests";

import { useAuthContext } from "./AuthContext";

function NewMoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<IMinimizeMovies[]>([]);
  const [likedMovies, setLikedMovies] = useState<IMinimizeMovies[]>([]);
  const [seenMovies, setSeenMovies] = useState<IMinimizeMovies[]>([]);

  const { userData } = useAuthContext();
  let userId: number | undefined = userData?.id;

  const addMovieToDislikedMovies = async (movieId: string | undefined) => {
    if (movieId && userId) {
      setDislikedMovies((prev) => [...prev, { IMDBId: movieId }]);
      try {
        await postDislikedMovies(movieId, userId);
      } catch (error) {
        console.log(error);
        setDislikedMovies((prev) =>
          prev.filter((movie) => movie.IMDBId !== movieId)
        );
      }
    }
  };
  const addMovieToLikedMovies = async (movieId: string | undefined) => {
    if (movieId && userId) {
      setLikedMovies((prev) => [...prev, { IMDBId: movieId }]);
      try {
        await postLikedMovies(movieId, userId);
      } catch (error) {
        console.log(error);
        setLikedMovies((prev) =>
          prev.filter((movie) => movie.IMDBId !== movieId)
        );
      }
    }
  };

  const addMovieToSeenMovies = async (movieId: string | undefined) => {
    if (movieId && userId) {
      setSeenMovies((prev) => [...prev, { IMDBId: movieId }]);
      try {
        await postSeenMovies(movieId, userId);
      } catch (error) {
        console.log(error);
        setSeenMovies((prev) =>
          prev.filter((movie) => movie.IMDBId !== movieId)
        );
      }
    }
  };

  const getAllViewedMovies = async () => {
    try {
      const [allSeenMovies, allLikedMovies, allDislikedMovies] =
        await Promise.all([
          getSeenMovies(userId),
          getLikedMovies(userId),
          getDislikedMovies(userId),
        ]);
      return {
        "seen-movies": allSeenMovies.data,
        "liked-movies": allLikedMovies.data,
        "disliked-movies": allDislikedMovies.data,
      };
    } catch (error) {
      console.error("Error fetching movie lists:", error);
    }
  };

  const resetAllLists = async () => {
    const movieLists = await getAllViewedMovies();

    /* console.log("Movie lists fetched:", movieLists); */

    if (!movieLists) {
      console.error("No lists found to empty");
      return;
    }

    const deleteRequests: Promise<void>[] = [];

    for (const [listName, movies] of Object.entries(movieLists)) {
      (movies as IMovie[]).forEach((movie) => {
        const id = movie.id;
        if (id) {
          /*  console.log(`Preparing to delete movie: ${id}, from ${listName}`);
           */
          deleteRequests.push(deleteMovie(listName, id));
        }
      });
    }

    await Promise.all(deleteRequests);
    setDislikedMovies([]);
    setLikedMovies([]);
    setSeenMovies([]);
    /*     console.log("All movies from all lists have been deleted"); */
  };

  const moveToDisliked = (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 0) {
      setLikedMovies(likedMovies.filter((movie) => movie.IMDBId !== movieId));
    } else if (activeButton === 2) {
      setSeenMovies(seenMovies.filter((movie) => movie.IMDBId !== movieId));
    }

    if (movieId)
      setDislikedMovies((prev) => [
        ...prev,
        {
          IMDBId: movieId,
          /*  Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
          id: "",
          movieId: "", */
        },
      ]);
  };

  const moveToLiked = (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 1) {
      setDislikedMovies(
        dislikedMovies.filter((movie) => movie.IMDBId !== movieId)
      );
    } else if (activeButton === 2) {
      setSeenMovies(seenMovies.filter((movie) => movie.IMDBId !== movieId));
    }

    if (movieId)
      setLikedMovies((prev) => [
        ...prev,
        {
          IMDBId: movieId,
          /*  Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
          id: "",
          movieId: "", */
        },
      ]);
  };

  const moveToSeen = (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 0) {
      setLikedMovies(likedMovies.filter((movie) => movie.IMDBId !== movieId));
    } else if (activeButton === 1) {
      setDislikedMovies(
        dislikedMovies.filter((movie) => movie.IMDBId !== movieId)
      );
    }

    if (movieId)
      setSeenMovies((prev) => [
        ...prev,
        {
          IMDBId: movieId,
          /*  Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
          id: "",
          movieId: "", */
        },
      ]);
  };

  /* const deleteMovieFromList = async (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 0) {
      getLikedMovies();
    } else if (activeButton === 1) {
      getDislikedMovies();
    } else {
      getSeenMovies();
    }
  }; */

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      const dislikedMoviesData = await getDislikedMovies(userId);
      const likedMoviesData = await getLikedMovies(userId);
      const seenMoviesData = await getSeenMovies(userId);
      if (moviesData && moviesData.data) {
        const extractedMovies = moviesData.data.map((movie: any) => ({
          id: movie.id,
          ...movie.attributes,
        }));
        setMovies(extractedMovies);
      }
      if (dislikedMoviesData && dislikedMoviesData.data) {
        const extractedMovies = dislikedMoviesData.data.map((movie: any) => ({
          IMDBId: movie.attributes.movies.data[0].attributes.IMDBId,
        }));
        setDislikedMovies(extractedMovies);
      }
      if (seenMoviesData && seenMoviesData.data) {
        const extractedMovies = seenMoviesData.data.map((movie: any) => ({
          IMDBId: movie.attributes.movies.data[0].attributes.IMDBId,
        }));
        setSeenMovies(extractedMovies);
      }
      if (likedMoviesData && likedMoviesData.data) {
        const extractedMovies = likedMoviesData.data.map((movie: any) => ({
          IMDBId: movie.attributes.movies.data[0].attributes.IMDBId,
        }));
        setLikedMovies(extractedMovies);
      }
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
        resetAllLists,
        moveToDisliked,
        moveToLiked,
        moveToSeen,
      }}
    >
      {children}
    </NewMoviesContext.Provider>
  );
}

export default NewMoviesProvider;
