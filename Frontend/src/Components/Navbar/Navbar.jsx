import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <div class="containe-navbar">
        <Link to="/" class="link-navbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </Link>

        <Link to="/Feedback" class="link-navbar">
          Feedback
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
