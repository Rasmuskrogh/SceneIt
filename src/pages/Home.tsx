import { useContext, useEffect, useState } from "react";
import { IMovies } from "../interfaces";
import Heart from "../assets/heart-home.svg";
import X from "../assets/x.svg";
import Button from "../components/Button";
import { NewMoviesContext } from "../hooks/useContent/NewMoviesContext";

import "../css/home.css";

function Home() {
  const [movie, setMovie] = useState<IMovies>();
  const [viewedMovies, setViewedMovies] = useState<IMovies[]>();
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
    console.log("dislikedMovies", dislikedMovies);
    console.log("likedMovies", likedMovies);
    console.log("seenMovies", seenMovies);

    const allViewedMovies = [...dislikedMovies, ...likedMovies, ...seenMovies];
    console.log("allViewedMovies", allViewedMovies);
    // setViewedMovies(allViewedMovies);
    // console.log(viewedMovies);

    if (movies.length > 0) {
      const singleMovieIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[singleMovieIndex]);
    }
  };

  const handleXButtonOnClick = async () => {
    await addMovieToDislikedMovies(movie?.IMDBId);
    setNewMovie();
  };
  const handleHeartButtonOnClick = async () => {
    await addMovieToLikedMovies(movie?.IMDBId);
    setNewMovie();
  };
  const handlSceneitXButtonOnClick = async () => {
    await addMovieToSeenMovies(movie?.IMDBId);
    setNewMovie();
  };

  useEffect(() => {
    if (movies.length > 0) {
      setNewMovie();
    }
  }, [movies]);

  useEffect(() => {
    console.log("disliked movies i use effect", dislikedMovies);
  }, [dislikedMovies]);

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
    </>
  );
}

export default Home;
