import React from "react";
import "../SCSS/Home.scss";
import Pitches from "./Pitches";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="main-container">
        <div className="left-card">
          <div className="left-card-content">
            <h1>More To Come</h1>
            <h3>A place where talent meets talent</h3>
            {/*  */}
            <Link to="/pitch-ideas">
              <button>Post A Job</button>
            </Link>
            {/* </Link> */}
            <div className="arrow-down">🔽</div>
          </div>
        </div>
        <div className="scroll-container">
          <div className="cards">
            <h1>This is a demo card</h1>
            <p>These are some random demo texts</p>
          </div>
          <div className="cards">
            <h1>This is a demo card</h1>
            <p>These are some random demo texts</p>
          </div>
        </div>
        <div className="scroll-container">
          <div className="cards">
            <h1>This is a demo card</h1>
            <p>These are some random demo texts</p>
          </div>
          <div className="cards">
            <h1>This is a demo card</h1>
            <p>These are some random demo texts</p>
          </div>
        </div>
      </div>
      <div className="lower-container">
        <h1>This is the low basin</h1>
      </div>
      <Pitches />
    </div>
  );
};
