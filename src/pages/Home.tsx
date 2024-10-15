import { useContext, useEffect, useState } from "react";
import { IMovies } from "../interfaces";
import Heart from "../assets/heart-home.svg";
import X from "../assets/x.svg";
import Button from "../components/Button";
import { NewMoviesContext } from "../hooks/useContent/NewMoviesContext";

import "../css/home.css";

function Home() {
  const [movie, setMovie] = useState<IMovies | null>(null);
  const [] = useState();

  const {
    movies,
    dislikedMovies,
    likedMovies,
    seenMovies,
    addMovieToDislikedMovies,
    addMovieToLikedMovies,
    addMovieToSeenMovies,
  } = useContext(NewMoviesContext);

  const setNewMovie = () => {
    const allViewedMovies = [...dislikedMovies, ...likedMovies, ...seenMovies];
    console.log("All viewed movies", allViewedMovies);

    /*    if (allViewedMovies.length >= movies.length) {
      setMovie(null);
      console.log("All movies viewed, no more movies to show.");
      return;
    }
 */

    if (allViewedMovies.length === 0) {
      console.log("No viewed movies yet, using full movies array.");
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
      return;
    }

    const unviewedMovies = movies.filter(
      (movie) =>
        !allViewedMovies.some((viewed) => viewed.IMDBId === movie.IMDBId) /* &&
        (movie ? movie.IMDBId !== movie?.IMDBId : true) */
    );

    console.log("Unviewed movies", unviewedMovies);

    if (unviewedMovies.length > 0) {
      const singleMovieIndex = Math.floor(
        Math.random() * unviewedMovies.length
      );
      setMovie(unviewedMovies[singleMovieIndex]);
    } else {
      setMovie(null);
      console.log("no more movies!");
    }
  };

  const handleXButtonOnClick = async () => {
    if (movie && !dislikedMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      await addMovieToDislikedMovies(movie?.IMDBId);
    }
    setNewMovie();
  };
  const handleHeartButtonOnClick = async () => {
    if (movie && !likedMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      await addMovieToLikedMovies(movie?.IMDBId);
    }
    setNewMovie();
  };
  const handlSceneitXButtonOnClick = async () => {
    if (movie && !seenMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      await addMovieToSeenMovies(movie?.IMDBId);
    }
    setNewMovie();
  };

  useEffect(() => {
    if (movies.length > 0) {
      console.log("Movies loaded", movies);
      setNewMovie();
    } else {
      console.log("No movies avaliable");
    }
  }, [movies]);

  useEffect(() => {
    setNewMovie();
  }, [dislikedMovies, likedMovies, seenMovies]);

  return (
    <>
      {movie && (
        <section className="wrapper home-section">
          <aside className="home-image-container">
            <img className="home-image" src={movie.Poster} alt={movie.Title} />
            <Button
              ClassName="x-button home-button"
              Label={X}
              OnClick={handleXButtonOnClick}
            />

            <Button
              ClassName="sceneit-button home-button"
              Label="Scene It!"
              OnClick={handlSceneitXButtonOnClick}
            />
            <Button
              ClassName="heart-button home-button"
              Label={Heart}
              OnClick={handleHeartButtonOnClick}
            />
          </aside>
          <article className="home-content-container">
            <h1 className="home-title">{movie.Title}</h1>
            <div>
              <h2 className="home-sub-headings">Summary:</h2>
              <p>{movie.Summary}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Genre:</h2>
              <p>{movie.Genre}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Director:</h2>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Actors:</h2>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Ratings:</h2>
              <span className="home-ratings">
                IMDB:
                <p>{movie.IMDBRating} / 10</p>
              </span>
              {movie.RottenTomatoesRating && (
                <span className="home-ratings">
                  Rotten Tomatoes: <p>{movie.RottenTomatoesRating}%</p>
                </span>
              )}
            </div>
          </article>
        </section>
      )}
      {!movie && (
        <section className="wrapper home-section">
          <h2 className="home-fallback-text">
            You have already seen all avaliable movies
          </h2>
        </section>
      )}
    </>
  );
}

export default Home;
