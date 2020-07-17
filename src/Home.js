import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <h1>Welcome to Lambda Eats!</h1>
      <p>The best pie in town! Probably!</p>
      
      <Link to="/pizza">
        <button>Create your Pizza!</button>
      </Link>
    </div>
  );
}

export default Home;