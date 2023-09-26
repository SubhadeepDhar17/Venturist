import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../SCSS/Pitches.scss";

export const Pitches = () => {
  const [pitch, setPitch] = useState([]);

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/startup");
        setPitch(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPitches();
  }, []);
  console.log(pitch);
  return (
    <div>
      <h1 className="heading">Recent Jobs</h1>
      <div>{pitch.company}</div>
      <ul>
        {pitch.map((pitchMap) => (
          <li key={pitchMap._id}>
            <br />
            <div className="pitch-container">
              <div className="top-part">
                <div className="logo-company-site">
                  <div>
                    <img src={pitchMap.logo} alt="" />
                  </div>
                  <div>
                    <h1>{pitchMap.company}</h1>
                    <Link to={`https://www.${pitchMap.website}`} target="_blank">
                      {pitchMap.website}
                    </Link>
                    <div className="amount">${pitchMap.amountRaised} raised</div>
                  </div>
                </div>

                <div className="founder-year">
                  <div>Founders: {pitchMap.founders}</div>
                  <div>Year Started: {pitchMap.yearStarted}</div>
                </div>
              </div>

              <div className="job-container">
                <div>
                  <div>Job Desc: {pitchMap.ideas} . ${pitchMap.salary} . {pitchMap.equity}% equity</div>
                  <div>{pitchMap.email} . Remote . {pitchMap.jobLocation}</div>
                </div>
                
                <a href="mailto:email@gmail.com"><button>Apply</button></a>
              </div>
            </div>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};
