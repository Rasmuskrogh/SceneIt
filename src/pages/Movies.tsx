import { useContext, useEffect, useState } from "react";
import { NewMoviesContext } from "../hooks/useContent/NewMoviesContext";
import { IMovies } from "../interfaces";

import "../css/movies.css";
import ListMovie from "../components/ListMovie";

function Movies() {
  const [activeButton, setActiveButton] = useState<number>(0);
  const [disliked, setDisliked] = useState<IMovies[]>([]);
  const [liked, setLiked] = useState<IMovies[]>([]);
  const [seen, setSeen] = useState<IMovies[]>([]);
  const [activeList, setActiveList] = useState<IMovies[]>([...liked]);

  const { movies, seenMovies, dislikedMovies, likedMovies } =
    useContext(NewMoviesContext);

  const setDislikedMovieList = () => {
    const dislikedIds = dislikedMovies.map((movie) => movie.IMDBId);
    setDisliked(movies.filter((movie) => dislikedIds.includes(movie.IMDBId)));
    console.log("disliked", disliked);
  };

  const setLikedMovieList = () => {
    const likedIds = likedMovies.map((movie) => movie.IMDBId);
    setLiked(movies.filter((movie) => likedIds.includes(movie.IMDBId)));
    console.log("liked", liked);
  };

  const setSeenMovieList = () => {
    const seenIds = seenMovies.map((movie) => movie.IMDBId);
    setSeen(movies.filter((movie) => seenIds.includes(movie.IMDBId)));
    console.log("seen", seen);
  };

  useEffect(() => {
    const updateMovieLists = () => {
      setLikedMovieList();
      setDislikedMovieList();
      setSeenMovieList();
    };

    if (movies.length > 0) {
      updateMovieLists();
    }
  }, [movies, likedMovies, dislikedMovies, seenMovies]);

  useEffect(() => {
    const makeCorrectListActive = () => {
      if (activeButton === 0) {
        setActiveList([...liked]);
      } else if (activeButton === 1) {
        setActiveList([...disliked]);
      } else {
        setActiveList([...seen]);
      }
    };
    makeCorrectListActive();
    console.log("activeList", activeList);
  }, [activeButton, disliked, liked, seen]);

  const handleActiveButtonClicked = (i: number) => {
    setActiveButton(i);
  };

  return (
    <div className="wrapper">
      <nav className="movies-button-nav">
        <button
          className={
            activeButton === 0 ? "movies-buttons active" : "movies-buttons"
          }
          onClick={() => handleActiveButtonClicked(0)}
        >
          Liked
        </button>
        <button
          className={
            activeButton === 1 ? "movies-buttons active" : "movies-buttons"
          }
          onClick={() => handleActiveButtonClicked(1)}
        >
          Disliked
        </button>
        <button
          className={
            activeButton === 2 ? "movies-buttons active" : "movies-buttons"
          }
          onClick={() => handleActiveButtonClicked(2)}
        >
          Seen
        </button>
      </nav>
      <section className="movies-list-item">
        {activeList.map((movie) => (
          <ListMovie
            key={movie.IMDBId}
            IMDBId={movie.IMDBId}
            Poster={movie.Poster}
            Title={movie.Title}
            Genre={movie.Genre}
            Director={movie.Director}
            Actors={movie.Actors}
            Summary={movie.Summary}
            IMDBRating={movie.IMDBRating}
            RottenTomatoesRating={movie.RottenTomatoesRating}
          />
        ))}
      </section>
    </div>
  );
}

export default Movies;
