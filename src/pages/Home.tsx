import { useContext, useEffect, useState } from "react";
import { IMovies } from "../interfaces";
import Heart from "../assets/heart-home.svg";
import X from "../assets/x.svg";
import Button from "../components/Button";
import { NewMoviesContext } from "../hooks/useContext/NewMoviesContext";

import "../css/home.css";

function Home() {
  const [movie, setMovie] = useState<IMovies | null>(null);
  const [] = useState();
  const [loading, setLoading] = useState<boolean>(true);

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
    console.log("inside setNewMovie");
    const allViewedMovies = [...dislikedMovies, ...likedMovies, ...seenMovies];

    if (allViewedMovies.length === 0) {
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
      return;
    }

    const unviewedMovies = movies.filter(
      (movie) =>
        !allViewedMovies.some((viewed) => viewed.IMDBId === movie.IMDBId) /* &&
        (movie ? movie.IMDBId !== movie?.IMDBId : true) */
    );

    if (unviewedMovies.length > 0) {
      const singleMovieIndex = Math.floor(
        Math.random() * unviewedMovies.length
      );
      const randomMovie = unviewedMovies[singleMovieIndex];
      console.log("Setting new movie", randomMovie);
      setMovie(randomMovie);
    } else {
      console.log("All movies viewed");

      setMovie(null);
    }
  };

  const handleXButtonOnClick = async () => {
    if (movie && !dislikedMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      await addMovieToDislikedMovies(movie.IMDBId);
    }
    setNewMovie();
  };
  const handleHeartButtonOnClick = async () => {
    if (movie && !likedMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      await addMovieToLikedMovies(movie.IMDBId);
    }
    setNewMovie();
  };
  const handleSceneitXButtonOnClick = async () => {
    if (movie && !seenMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      await addMovieToSeenMovies(movie.IMDBId);
    }
    setNewMovie();
  };

  useEffect(() => {
    console.log("Movies the console log?:", movies);
    if (movies?.length) {
      setLoading(false);
      setNewMovie();
    } else {
    }
  }, [movies]);

  useEffect(() => {
    setNewMovie();
  }, [dislikedMovies, likedMovies, seenMovies]);

  return (
    <>
      {loading ? (
        <h2 className="home-fallback-text">Loading movies...</h2>
      ) : movie ? (
        <section className="wrapper home-section">
          <aside className="home-image-container">
            {movie.Poster && (
              <img
                className="home-image"
                src={movie.Poster}
                alt={movie.Title}
              />
            )}
            <Button
              ClassName="x-button home-button"
              Label={X}
              OnClick={handleXButtonOnClick}
            />

            <Button
              ClassName="sceneit-button home-button"
              Label="Scene It!"
              OnClick={handleSceneitXButtonOnClick}
            />
            <Button
              ClassName="heart-button home-button"
              Label={Heart}
              OnClick={handleHeartButtonOnClick}
            />
          </aside>
          <article className="home-content-container">
            <h1 className="home-title">
              {movie.Title || "No title avaliable"}
            </h1>
            <div>
              <h2 className="home-sub-headings">Summary:</h2>
              <p>{movie.Summary || "No summary avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Genre:</h2>
              <p>{movie.Genre || "No genre avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Director:</h2>
              <p>{movie.Director || "No director avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Actors:</h2>
              <p>{movie.Actors || "No actors avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Ratings:</h2>
              <span className="home-ratings">
                IMDB:
                <p>{movie.IMDBRating || "No IMDB rating avalialbr"} / 10</p>
              </span>
              {movie.RottenTomatoesRating && (
                <span className="home-ratings">
                  Rotten Tomatoes: <p>{movie.RottenTomatoesRating}%</p>
                </span>
              )}
            </div>
          </article>
        </section>
      ) : (
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
