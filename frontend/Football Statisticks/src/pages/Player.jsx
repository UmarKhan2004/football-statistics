import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Player.css"
import { FootballContext } from "../components/FootballContext";
import {
    FaCalendar,
    FaFutbol,
    FaRunning,
    FaStar,
    FaFlag,
    FaTshirt,
    FaWeightHanging,
    FaRulerVertical,
    FaClock,
} from "react-icons/fa";
import Chart from "../components/Chart";
import { GiSoccerKick, GiWhistle } from "react-icons/gi";
import Stats from "./Stats";
function Player() {
    const{player,loading}=useContext(FootballContext)
    console.log(player)
    return (
        <>
            <Navbar />
            <section className="hero">
                <Sidebar />
                <main className="content-player">
                    <section className="player-header">
                        <div className="player-image-container">
                            <img src="" alt="" />
                        </div>
                        <div className="player-info">
                            <h1>Alex Morgan</h1>
                            <p>Attacking Midfielder - Central Midfielder</p>
                            <div className="brief-intro">
                                <p><GiSoccerKick /> FCT United</p>
                                <p><FaCalendar /> 25 Years</p>
                                <p><FaRulerVertical /> 180 cm</p>
                                <p><FaWeightHanging /> 75 kg</p>
                                <p><FaFutbol /> Right Foot</p>
                            </div>
                        </div>
                    </section>
                    <section className="player-overview">
                    <div className="player-value-container">
                        <div className="value-card">
                            <p>Market Value</p>
                            <h3>$283M</h3>
                        </div>
                        <div className="value-card">
                            <p><FaFlag /> Nationality</p>
                            <h3>Argentina</h3>
                        </div>
                        <div className="value-card">
                            <div className="card-title">
                                <FaCalendar />
                                <span>Joined</span>
                            </div>
                            <h3>19 Jul 2024</h3>
                        </div>
                    </div>
                    <div className="shirt-info">
                        <p>Shirt Number</p>
                        <h1>10</h1>
                        <p>Contract until</p>
                        <p>July 19 2035</p>
                    </div>
                    </section>
                    <nav className="player-nav">
                        <ul>
                            <li><a href="">Overview</a></li>
                            <li><a href="">Statistics</a></li>
                            <li><a href="">Matches</a></li>
                            <li><a href="">Career</a></li>
                            <li><a href="">Trophies</a></li>
                            <li><a href="">Transfers</a></li>
                            <li><a href="">News</a></li>
                        </ul>
                    </nav>
                    <section className="player-stats-container">
                        <div className="player-statsCard">
                            <FaRunning /><p>Matches</p>
                            <h1>128</h1>
                            <p>All Competittions</p>
                        </div>
                        <div className="player-statsCard">
                            <FaFutbol /><p>Goals</p>
                            <h1>45</h1>
                            <p>All Competittions</p>
                        </div>
                        <div className="player-statsCard">
                            <GiSoccerKick /><p>Assists</p>
                            <h1>32</h1>
                            <p>All Competittions</p>
                        </div>
                        <div className="player-statsCard">
                            <FaClock /><p>Minutes Played</p>
                            <h1>8,764</h1>
                            <p>All Competittions</p>
                        </div>
                        <div className="player-statsCard">
                            <FaStar /><p>Average Ratings</p>
                            <h1>7.68</h1>
                            <p>All Competittions</p>
                        </div>
                    </section>
                    <section className="graph-containers">
                        <div className="attribute-overview">
                                <Chart/>
                        </div>
                        <div className="heat-map">

                        </div>
                        <div className="season-stats">
<Stats/>
                        </div>
                    </section>
                </main>
            </section>
        </>
    )
}
export default Player;