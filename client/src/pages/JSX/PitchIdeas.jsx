import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../SCSS/PitchIdeas.scss";

export const PitchIdeas = () => {
  const userID = window.localStorage.getItem("userID");

  const [startUp, setstartUp] = useState({
    company: "",
    website: "",
    logo: "",
    founders: "",
    email: "",
    yearStarted: 0,
    amountRaised: 0,
    ideas: "",
    salary: 0,
    equity: 0,
    hq: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setstartUp({ ...startUp, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/startup", startUp);
      alert("Posted");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  console.log(startUp);
  return (
    <div>
      <h1 className="heading-pitch-ideas">Create Pitch</h1>
      <form className='pitch-idea-form' onSubmit={onSubmit}>
        <label htmlFor="company">Company: </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          onChange={handleChange}
        />
        <label htmlFor="website">Website: </label>
        <input
          type="text"
          id="website"
          name="website"
          required
          onChange={handleChange}
        />
        <label htmlFor="company">Logo: </label>
        <input
          type="text"
          id="logo"
          name="logo"
          required
          onChange={handleChange}
        />
        <label htmlFor="founders">Founders: </label>
        <input
          type="text"
          name="founders"
          id="founders"
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={handleChange}
        />
        <p>Please do not use " , - / " in number fields</p>
        <div className="two-fields">
          <label htmlFor="yearStarted">Started (year): </label>
          <label htmlFor="amountRaised">Amount Raised: ($)</label>
        </div>
        <div className="two-fields">
          <input
            type="number"
            name="yearStarted"
            id="yearStarted"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="amountRaised"
            id="amountRaised"
            onChange={handleChange}
          />
        </div>
        
        <div className="two-fields">
          <label htmlFor="salary">Salary ($): </label>
          <label htmlFor="equity">Equity ($): </label>
        </div>
        <div className="two-fields">
          <input
            type="number"
            name="salary"
            id="salary"
            onChange={handleChange}
          />
          <input
            type="number"
            step='0.01'
            name="equity"
            id="equity"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="ideas">Job Title: </label>
        <input
          type="text"
          name="ideas"
          id="ideas"
          required
          onChange={handleChange}
        />
        <label htmlFor="ideas">Head Quaters: </label>
        <input type="text" name="hq" id="hq" required onChange={handleChange} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
