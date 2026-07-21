import React from "react";
import "../App.css"
import "./TeamNav.css"
function TeamNav(){
    return(
        <nav className="team-nav">
            <div className="nav-heading">
                <h1>Teams</h1>
                <p>Explore teams from different football Leagues</p>
            </div>
            <form action="" className="search-bar">
                <input type="text" placeholder="search teams.." />
                <button>Search</button>
            </form>
        </nav>
    )
}
export default TeamNav;