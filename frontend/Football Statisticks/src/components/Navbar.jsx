import React from "react";
import "../App.css";
import "./Navbar.css"
import logo from "../assets/download (1).png";
import { NavLink, Link } from "react-router-dom";
import { useState,useContext } from "react";
import { FootballContext } from "./FootballContext";
function Navbar() {
        const{player,league,teams}=useContext(FootballContext)
        const [search, setSearch] = useState("");
const [showResults, setShowResults] = useState(false);
const results = [
    ...player
        .filter(player =>
            player.name.toLowerCase().includes(search.toLowerCase())
        )
        .map(player => ({
            id: player.id,
            name: player.name,
            type: "Player"
        })),

    ...team
        .filter(team =>
            team.name.toLowerCase().includes(search.toLowerCase())
        )
        .map(team => ({
            id: team.id,
            name: team.name,
            type: "Team"
        })),

    ...league
        .filter(league =>
            league.name.toLowerCase().includes(search.toLowerCase())
        )
        .map(league => ({
            id: league.id,
            name: league.name,
            type: "League"
        }))
];
        const [isLoggedIn, setIsLoggedIn] = useState(() => {
                if (localStorage.getItem("access")) {
                        return true;
                }
                return false;
        })
        function handleLogout(){
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                setIsLoggedIn(false)
                window.location.href='/login'
        }
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
                                        <li><NavLink to='/players'>Players</NavLink></li>
                                        <li><NavLink to='/league'>League </NavLink></li>
                                       
                                </ul>
                        </div>
                        <div className="search-bar">
                                <input type="search"
                                placeholder="Search players teams leagues "   
                                value={search}
    onChange={(e) => {
        setSearch(e.target.value);
        setShowResults(true);
    }} />
    {showResults && search.trim() && (
        <div className="search-results">
            {results.length > 0 ? (
                results.slice(0, 8).map(result => (
                    <Link
                        key={`${result.type}-${result.id}`}
                        to={
                            result.type === "Player"
                                ? `/player/${result.id}`
                                : result.type === "Team"
                                ? `/team/`
                                : `/league/`
                        }
                        onClick={() => {
                            setSearch("");
                            setShowResults(false);
                        }}
                        className="search-result"
                    >
                        <span>{result.name}</span>
                        <small>{result.type}</small>
                    </Link>
                ))
            ) : (
                <div className="no-results">
                    No results found
                </div>
            )}
        </div>
    )}

                        </div>
                        {isLoggedIn?
                        <div className="log-out-btn">
                                <button onClick={handleLogout}>Log out</button>
                        </div>:
                        <div className="sign-up-btn">
                                <Link to='/signup'>Sign Up</Link>                                
                                <Link to='/login'>Log In</Link>                                
                        </div>
                        }
                </nav>
        )
}
export default Navbar;