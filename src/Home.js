import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <h1 className="home-title">Welcome to Lambda Eats!</h1>
      <h2>The best pie in town! Probably.</h2>

      <Link to="/pizza">
        <button>Create your Pizza!</button>
      </Link>
    </div>
  );
}

export default Home;
