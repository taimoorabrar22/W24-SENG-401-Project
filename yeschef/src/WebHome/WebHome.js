import React from "react";
import "./WebHome.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "../Login/Login";

function App() {
  return (
    <div className="mainpage">
      <div className="div">
        <div className="group">
          <div className="overlap-group"></div>
          <div className="group-2">
            <div className="text-wrapper-3">YES, CHEF</div>
            <div className="text-wrapper-2">Find Unique Recipes Fast</div>
            <img
              src="https://images.squarespace-cdn.com/content/v1/55329e37e4b02842e063c322/1590519650119-466CXOMLZCFSNI6NWJJE/fabrizio-magoni-boaDpmC-_Xo-unsplash.jpg?format=1500w"
              alt="Main Pic"
              className="main-pic"
            />
            <Link to="/login">
              <button className="LoginButton">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
