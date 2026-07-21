import React, { useContext } from "react";
import "../App.css";
import "./Topscorer.css"
import Ronaldo from "../assets/Ronaldo.jpg"
import Messi from "../assets/Messi.jpg"
import Kane from "../assets/Kane.jpg"
import Haaland from "../assets/Haaland.jpg"
import Mbappe from "../assets/Mbappe.jpg"
import {FootballContext}  from "./FootballContext"
function Topscorer({ children }) {
    const { player,loading,teamStanding,match } = useContext(FootballContext)
    const topScorer = [...player].sort((a, b) => b.goals - a.goals).slice(0, 5)
    console.log(topScorer)

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
                        <a href="">View All</a>
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
                                <h2>Loading...</h2>
                            ) : (teamStanding.map((team, index) => (
                                <tr key={team.id}>
                                    <td>{index + 1}</td>
                                    <td>{team.name}</td>
                                    <td>{team.played}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.loss}</td>
                                    <td>{team.points}</td>
                                </tr>
                            )))
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
                    ) : (match.map(m => (
                        <div key={m.id} className="match-card">
                            <span>{m.home_team}</span>
                            <span>{m.home_score} - {m.away_score}</span>
                            <span>{m.away_team}</span>
                            <span>{m.date}</span>
                        </div>
                    ))

                    )}
                </div>
                <div className="top-player">
                    <div className="section-header">
                        <h3>Top Scorers</h3>
                        <a href="">View All</a>
                    </div>
                    {loading?(
                        <h2>Loading...</h2>
                    ):(topScorer.map((topgoalScorer) => (
                    <div key={topgoalScorer.id} className="topScorer-card">
                        <img src={topgoalScorer.picture} alt={topgoalScorer.name} />
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