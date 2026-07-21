import React from "react";
import Mainbar from '../components/Mainbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Statscard from '../components/Statscard'
import Topscorer from '../components/Topscorer'
import { FaCalendar,FaTrophy,FaClock,FaFootballBall } from "react-icons/fa";
import FootballProvider from "../components/FootballContext";
import MatchList from "../components/MatchList";
import "./Match.css"
function Match() {
    return (
        <>
            <FootballProvider>
                <Navbar />
                <section className="hero">
                    <Sidebar />
                
                <main className="match-main-content">
                    <nav>
                        <div className="nav-heading">
                            <h1><FaCalendar/>Matches</h1>
                        </div>
                        <form  className="match-nav">
                            <input type="text" placeholder="Search Matches..." />
                            <button>Search</button>
                        </form>
                    </nav>
<div className="match-card-container">
    <div className="match-card">
        <FaCalendar/><h1>128</h1>
        <p>Total Matches all Compettition</p>
    </div>
    <div className="match-card">
<FaTrophy/><h1>42</h1>
<p>Completed Matches Finished</p>
    </div>
    <div className="match-card">
<FaClock/><h1>86</h1>
<p>upcoming Matches to go</p>

    </div>
    <div className="match-card">
        <FaFootballBall/><h1>3.2</h1>
        <p>Avg goals per match This season</p>
        
    </div>
    </div>          
    <MatchList/>          
                </main>
                </section>
            </FootballProvider>
        </>
    )
}
export default Match;
