import React, { useContext } from "react";
import { FootballContext } from "./FootballContext";
import "../App.css";
import "./TeamStats.css"
function TeamStats({children}){
    const{team,teamStanding,loading,league,match,player}=useContext(FootballContext)
    console.log(teamStanding)
    return(
        <>
        <div className="team-stats">
            <div className="team-cards">
                <h1>{team.length}</h1>
                <p>Total Teams</p>
            </div>
               <div className="team-cards">
                <h1>{league.length}</h1>
                <p>Leagues</p>
            </div> 
              <div className="team-cards">
                <h1>{match.length}</h1>
                <p>Total Matches</p>
            </div>  
             <div className="team-cards">
                <h1>{player.length}</h1>
                <p>Total Players</p>
            </div>
        </div>
        <div className="team-table">
                    <div className="section-header">
                        <h3>All Teams</h3>
                        <a href="">View All</a>
                    </div>
                    <table className="teamStanding-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TEAM</th>
                                <th>LEAGUE</th>
                                <th>Played</th>
                                <th>Won</th>
                                <th>Draw</th>
                                <th>Lost</th>
                                <th>Points</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8">Loading..</td>
                                </tr>
                            ) : (teamStanding.map((team, index) => (
                                <tr key={team.id}>
                                    <td>{index + 1}</td>
                                    <td>{team.team}</td>
                                    <td>{team.league}</td>
                                    <td>{team.played}</td>
                                    <td>{team.win}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.loss}</td>
                                    <td>{team.points}</td>
                                </tr>
                            )))
                            }
                        </tbody>
                    </table>
                </div>
        </>
    )
}
export default TeamStats;
