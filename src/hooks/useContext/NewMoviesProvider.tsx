import { useEffect, useState } from "react";
import { NewMoviesContext } from "./NewMoviesContext";
import { IMovie, IMovies } from "../../interfaces";
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

function NewMoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<IMovies[]>([]);
  const [likedMovies, setLikedMovies] = useState<IMovies[]>([]);
  const [seenMovies, setSeenMovies] = useState<IMovies[]>([]);

  const addMovieToDislikedMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        await postDislikedMovies(movieId);
        const values = await getDislikedMovies();
        const dislikedMoviesData =
          values.data.map((movie: any) => movie.attributes) || [];
        console.log("dislikedMoviesData:", dislikedMoviesData);

        setDislikedMovies(dislikedMoviesData);
      } catch (error) {
        console.log(error);
      }
  };
  const addMovieToLikedMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        await postLikedMovies(movieId);
        const values = await getLikedMovies();
        const likedMoviesData =
          values.data.map((movie: any) => movie.attributes) || [];
        setLikedMovies(likedMoviesData);
      } catch (error) {
        console.log(error);
      }
  };

  const addMovieToSeenMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        await postSeenMovies(movieId);
        const values = await getSeenMovies();
        const seenMoviesData =
          values.data.map((movie: any) => movie.attributes) || [];
        setSeenMovies(seenMoviesData);
      } catch (error) {
        console.log(error);
      }
  };

  const getAllViewedMovies = async () => {
    try {
      const [allSeenMovies, allLikedMovies, allDislikedMovies] =
        await Promise.all([
          getSeenMovies(),
          getLikedMovies(),
          getDislikedMovies(),
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
          Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
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
          Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
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
          Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
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
      const dislikedMoviesData = await getDislikedMovies();
      const likedMoviesData = await getLikedMovies();
      const seenMoviesData = await getSeenMovies();
      if (moviesData && moviesData.data) {
        const extractedMovies = moviesData.data.map(
          (movie: any) => movie.attributes
        );
        setMovies(extractedMovies);
      }
      if (dislikedMoviesData && dislikedMoviesData.data) {
        const extractedMovies = dislikedMoviesData.data.map(
          (movie: any) => movie.attributes
        );
        setDislikedMovies(extractedMovies);
      }
      if (seenMoviesData && seenMoviesData.data) {
        const extractedMovies = seenMoviesData.data.map(
          (movie: any) => movie.attributes
        );
        setSeenMovies(extractedMovies);
      }
      if (likedMoviesData && likedMoviesData.data) {
        const extractedMovies = likedMoviesData.data.map(
          (movie: any) => movie.attributes
        );
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
