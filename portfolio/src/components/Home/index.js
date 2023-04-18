import React, { useContext } from "react";
import "./home.css";
import { Button, Container } from "@mui/material";
import { AppContext } from "../../context/appContext";
import { Link } from "react-scroll";

const Home = () => {
  const { myDetails } = useContext(AppContext);
  return (
    <header id="home" className="header">
      <div className="intro">
        <>
          <div className="row">
            <div className="intro-text">
              <h1>{myDetails.Name}</h1>
              <div className="designation">
                {myDetails.Designation &&
                  myDetails.Designation.map((designation) => (
                    <p>{`•  ${designation}`}</p>
                  ))}
              </div>
              <Button href="#about" variant="contained" className="learnMore">
                <Link
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="Link"
                  to="about"
                >
                  Learn More
                </Link>
              </Button>{" "}
            </div>
          </div>
        </>
      </div>
    </header>
  );
};

export default Home;
