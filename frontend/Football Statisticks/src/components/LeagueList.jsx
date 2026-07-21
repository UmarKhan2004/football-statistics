import React, { useContext } from "react";
import { FootballContext } from "./FootballContext";
import "../pages/League.css"
function LeagueList(){
    const{league,team,match,loading}=useContext(FootballContext)
    console.log(team[0])
    console.log(league[0])
    const totalGoals=match.filter(m=>m.completed).reduce((total,m)=>{
        return total+m.home_score+m.away_score;
    },0)
    return(
        <>
        <div className="section-headers">
                <h1>All Leagues</h1>
                <input type="search" placeholder="Search League.." className="league-search-bar" />
            </div>
            <table>
                <thead>
                                    <tr>
                                        <th>LEAGUE</th>
                                        <th>COUNTRY</th>
                                        <th>TEAMS</th>
                                        <th>MATCHES</th>
                                        <th>GOALS</th>
                                        <th>STATUS</th>
                                        
                                    </tr>
                                </thead>
            <tbody>                    
            {loading?(
                <tr >
                    <td colSpan="8">Loading...</td>
                </tr>
            ):(
                league.map((l,index)=>(
                    <tr key={l.id}>
                        <td>{l.name}</td>
                        <td>{l.country}</td>
                        <td>{l.teams.length}</td>
                        <td>{match.filter(m=>m.league===l.name).length}</td>
                        <td>{
                        match.filter(m=>m.league===l.name && m.completed).reduce((total,m)=>total+m.home_score+m.away_score,0)
                        }</td>
                        <td>{l.is_active?"Active":"InActive"}</td>
                    </tr>
                ))
            )}
            </tbody>
            </table>
        </>
    )
}
export default LeagueList;