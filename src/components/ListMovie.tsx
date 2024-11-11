import { IListMovieProps } from "../interfaces";

import "../css/listMovies.css";
import { useContext } from "react";
import { NewMoviesContext } from "../hooks/useContext/NewMoviesContext";
import Trashcan from "../assets/trash-2.svg";

function ListMovie({
  Poster,
  Title,
  Genre,
  Director,
  Actors,
  IMDBRating,
  RottenTomatoesRating,
  Summary,
  IMDBId,
  ActiveButton,
}: IListMovieProps) {
  const { moveToDisliked, moveToLiked, moveToSeen } =
    useContext(NewMoviesContext);

  const handleMoveToDisliked = () => {
    moveToDisliked(IMDBId, ActiveButton);
  };

  const handleMoveToLiked = () => {
    moveToLiked(IMDBId, ActiveButton);
  };

  const handleMoveToSeen = () => {
    moveToSeen(IMDBId, ActiveButton);
  };

  const handleDeletefromList = () => {};

  return (
    <article className="listMovie-acticle">
      <div className="listMovie-poster-ul-wrapper">
        <figure>
          <img className="listMovie-poster" src={Poster} alt="Movie poster" />
        </figure>
        <ul className="listMovie-ul">
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">Title:</h3>
              <p>{Title}</p>
            </span>
          </li>
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">Genre:</h3>
              <p>{Genre}</p>
            </span>
          </li>
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">Director:</h3>
              <p>{Director}</p>
            </span>
          </li>
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">Actors:</h3>
              <p>{Actors}</p>
            </span>
          </li>
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">IMDB rating:</h3>
              <p>{IMDBRating}/10</p>
            </span>
          </li>
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">Rotten Tomatoes rating:</h3>
              <p>{RottenTomatoesRating}%</p>
            </span>
          </li>
          <li>
            <span className="listMovie-span">
              <h3 className="listMovie-h3">Summary:</h3>
              <p>{Summary}</p>
            </span>
          </li>
        </ul>
      </div>
      <div className="listmovies-buttons-div-wrapper">
        <div className="listMovie-buttons-div">
          <h3 className="listMovie-h3">Move to:</h3>
          {ActiveButton === 0 && (
            <div className="listMovie-active-buttons-div">
              <button
                className="listMovie-buttons"
                onClick={handleMoveToDisliked}
              >
                Disliked
              </button>
              <button className="listMovie-buttons" onClick={handleMoveToSeen}>
                Seen
              </button>
            </div>
          )}
          {ActiveButton === 1 && (
            <div className="listMovie-active-buttons-div">
              <button className="listMovie-buttons" onClick={handleMoveToLiked}>
                Liked
              </button>
              <button className="listMovie-buttons" onClick={handleMoveToSeen}>
                Seen
              </button>
            </div>
          )}

          {ActiveButton === 2 && (
            <div className="listMovie-active-buttons-div">
              <button className="listMovie-buttons" onClick={handleMoveToLiked}>
                Liked
              </button>
              <button
                className="listMovie-buttons"
                onClick={handleMoveToDisliked}
              >
                Disliked
              </button>
            </div>
          )}
        </div>
        {ActiveButton === 0 ? (
          <div>
            <button
              onClick={handleDeletefromList}
              className="listMovies-trashcan"
            >
              <img src={Trashcan} alt="" />
            </button>
          </div>
        ) : (
          <div>
            {ActiveButton === 1 ? (
              <button
                onClick={handleDeletefromList}
                className="listMovies-trashcan"
              >
                <img src={Trashcan} alt="" />
              </button>
            ) : (
              <button
                onClick={handleDeletefromList}
                className="listMovies-trashcan"
              >
                <img src={Trashcan} alt="" />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ListMovie;
