import Card from "../components/Layout/Card";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <Card>
      <h1>Welcome to devNotes</h1>
      <hr />
      <h3>This react application is under construction</h3>
      <p>
        This application was built with the intention of being a demonstration
        of the technologies of typescript and react. It was built within my
        company's Individual Development Program (IDP) and is intended to serve
        as practice in developing with these technologies. The application aims
        to serve as a notepad for youtube videos. Making you, self-taught
        developer, have a single place to save notes from video tutorials,
        courses, etc.
      </p>
      <p>
        To learn more about the application visit github:{" "}
        <a href="https://github.com/felipeiagocruz/devNotes">Click here.</a>
      </p>
      <p></p>
      <p className={classes.icons}>
        <br /> Felipe Cruz, Assistant Software Developer
        <br />
        <a href="https://github.com/felipeiagocruz">
          <AiFillGithub />
        </a>
        <a href="https://br.linkedin.com/in/felipe-iago-b88209155">
          <AiFillLinkedin />
        </a>
        <a href="https://twitter.com/FelipeICruz">
          <AiFillTwitterCircle />
        </a>
      </p>
    </Card>
  );
};

export default Home;
