import React, { useContext } from "react";
import "../App.css";
import "./Topscorer.css"
import { FootballContext } from "./FootballContext"
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
function Topscorer({ children }) {
    const { player, loading, teamStanding, match } = useContext(FootballContext)
    const topScorer = [...player].sort((a, b) => b.goals - a.goals).slice(0, 5)
    console.log(topScorer)
    console.log("loading:", loading);
    console.log("player:", player);
    return (
        <>
            <div className="bento-container">
                <div className="top-scorer">
                    {loading ? (
                        <h2>Loading...</h2>
                    ) :
                        (topScorer.map((topgoalScorer) => (
                            <div key={topgoalScorer.id} className="topScorer-card">
                                <h4>{topgoalScorer.name}</h4>
                                <h2>{topgoalScorer.goals}</h2>
                                <p>Goals</p>
                            </div>
                        ))
                        )}
                </div>
                <div className="league-table">
                    <div className="section-header">
                        <h3>League Table</h3>
                        <Link to="/match">View All</Link>
                    </div>
                    <table className="standings-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>P</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>Pts</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7">Loading...</td>
                                </tr>
                            ) : teamStanding.map((team, index) => {
                                console.log(team);
                                console.log(Object.keys(team));
                                return (
                                    <tr key={team.id}>
                                        <td>{index + 1}</td>
                                        <td>{team.team}</td>
                                        <td>{team.played}</td>
                                        <td>{team.win}</td>
                                        <td>{team.draws}</td>
                                        <td>{team.loss}</td>
                                        <td>{team.points}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="recent-matches">

                    <div className="section-header">
                        <h3>Recent Matches</h3>
                        <a href="">View All</a>
                    </div>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : match.slice(0,6).map((m) => (
                        <div key={m.id} className="match-card">
                            <span>{m.home_team}</span>
                            <span>{m.home_score} - {m.away_score}</span>
                            <span>{m.away_team}</span>
                            <span>{m.date}</span>
                        </div>
                    )
                    )}
                </div>
                <div className="top-player">
                    <div className="section-header">
                        <h3>Top Scorers</h3>
                        <a href="">View All</a>
                    </div>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : (topScorer.map((topgoalScorer) => (
                        <div key={topgoalScorer.id} className="topScorer-card">
                            <FaUserCircle size={40} color="#bdbdbd"/>
                            <h4>{topgoalScorer.name}</h4>
                            <h2>{topgoalScorer.goals}</h2>
                            <p>Goals</p>
                        </div>)
                    ))}
                </div>
            </div>
        </>
    )
}
export default Topscorer;