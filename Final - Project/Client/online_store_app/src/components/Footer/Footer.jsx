import "./Footer.css";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-center text-lg-start my-footer">
      <div className="text-center p-3 my-footer-div">
        Created By: Ariel Elazam © Tel: 0548132248 &nbsp; &nbsp; |
        <NavLink
          className="nav-link active"
          aria-current="page"
          to="/aboutus"
          activeClassName="activeLink"
        >
          <div>About Us</div>
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
