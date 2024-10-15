import { IMovies } from "../interfaces";

import "../css/listMovies.css";

function ListMovie({
  Poster,
  Title,
  Genre,
  Director,
  Actors,
  IMDBRating,
  RottenTomatoesRating,
  Summary,
}: IMovies) {
  return (
    <article className="listMovie-acticle">
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
    </article>
  );
}

export default ListMovie;
