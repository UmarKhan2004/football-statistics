import React from "react";
import "../App.css";
import "./Navbar.css"
import logo from "../assets/download (1).png";
import { NavLink } from "react-router";
function Navbar() {
        return (
                <nav className="Navbar">
                        <div className="nav-logo">
                                <img src={logo} alt="football logo" />
                        </div>
                        <div className="nav-links">
                                <ul>
                                        <li><NavLink to="/">Home</NavLink></li>
                                        <li><NavLink to='/team'>Team</NavLink></li>
                                        <li><NavLink to='/match'>Matches</NavLink></li>
                                        <li><NavLink to='/player'>Players</NavLink></li>
                                        <li><NavLink to='/league'>League </NavLink></li>
                                        <li><NavLink to='/statistics'>Statistics</NavLink></li>
                                </ul>
                        </div>
                        <div className="search-bar">
                                <input type="search" />
                        </div>
                        <div className="sign-up-btn">
                                <a href=''>Sign Up</a>
                        </div>
                </nav>
        )
}
export default Navbar;