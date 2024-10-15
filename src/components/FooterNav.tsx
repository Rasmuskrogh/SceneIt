import { Link } from "react-router-dom";
import Movie from "../assets/film.svg";
import Heart from "../assets/heart.svg";
import Account from "../assets/user.svg";

import "../css/footerNav.css";

function FooterNav() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-film">
        <img src={Movie} alt="" />
      </Link>
      <Link to="/movies" className="footer-heart">
        <img src={Heart} alt="" />
      </Link>
      <Link to="/account" className="footer-account">
        <img src={Account} alt="" />
      </Link>
    </footer>
  );
}

export default FooterNav;
