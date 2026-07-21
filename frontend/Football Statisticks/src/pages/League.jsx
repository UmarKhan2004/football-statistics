import React, { useContext } from "react";
import Mainbar from '../components/Mainbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Statscard from '../components/Statscard'
import Topscorer from '../components/Topscorer'
import FootballProvider from "../components/FootballContext";
import LeagueList from "../components/LeagueList";
import "./League.css"
import { FaTrophy,FaSave,FaCalendar, FaFootballBall } from "react-icons/fa";
import { FootballContext } from "../components/FootballContext";
function League() {
    const{league,team,match}=useContext(FootballContext)
    const completedMatches=match.filter(m=>m.completed)
    const totalGoals=completedMatches.reduce((total,m)=>total+m.home_score+m.away_score,0)
const aveargeGoals=completedMatches.length>0?(totalGoals/completedMatches.length).toFixed(2):0
    return (
        <>
                <Navbar />
                <section className="hero">
                    <Sidebar />
                    <main className="League-content">
                        <nav>
                            <div className="nav-heading">
                                <h1><FaCalendar />Leagues</h1>
                            </div>
                            <form className="league-nav">
                                <input type="text" placeholder="Search Leagues..." />
                                <button>Search</button>
                            </form>
                        </nav>
                    <div className="league-card-container">
                        <div className="league-card">
                            <FaTrophy/><h1>{league.length}</h1>
                            <p>Total Leagues</p>
                        </div>
                        <div className="league-card">
                    <FaSave/><h1>{team.length}</h1>
                    <p>Total Teams Accross all leagues</p>
                        </div>
                        <div className="league-card">
                    <FaCalendar/><h1>{match.length}</h1>
                    <p>Total matches This season</p>
                        </div>
                        <div className="league-card">
                            <FaFootballBall/><h1>{totalGoals}</h1>
                            <p>Total goals.This season</p>
                        </div>
                        <div className="league-card">
                            <FaFootballBall/>{aveargeGoals}<h1></h1>
                            <p>Avg Goals/Match This season</p>
                        </div>
                        </div>
                        <LeagueList/>          
                    </main>
                </section>
        
        </>
    )
}
export default League;