import Film from "../assets/film.svg";
import Filter from "../assets/filter.svg";
import { Link } from "react-router-dom";

import "../css/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo-div">
        <Link className="header-logo-link" to="/">
          <img src={Film} alt="logo" />
          <h1 className="header-title">SceneIt</h1>
        </Link>
      </div>
      <Link to="/filter">
        <img src={Filter} alt="filter icon" />
      </Link>
    </header>
  );
}

export default Header;
