import classes from "./NavBar.module.css";
import Auth from "../Auth/Auth";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className={classes.welcomebar}>
        <div className={classes.welcomeItem}>
          <h1>devNotes</h1>
        </div>
        <div className={classes.welcomeItem}>
          <Auth />
        </div>
      </div>
      <ul className={classes.navBar}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="mycollections">My collections</NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;
