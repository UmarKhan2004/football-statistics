import React from "react";
import { useContext } from "react";
import { FootballContext } from "./FootballContext";
import { FaHamburger,FaCalendar } from "react-icons/fa";
import "./MatchList.css"
function MatchList(){
    const{player,match,team,league,loading}=useContext(FootballContext)
return(
    <>
    <div className="section-headers">
        <h1>All Matches</h1>
        <button><FaHamburger/>Table View</button>
        <button><FaCalendar/>Calender View</button>
    </div>
    <table>
        <thead>
                            <tr>
                                <th>DATE</th>
                                <th>TIME</th>
                                <th>HOME TEAM</th>
                                <th>SCORE</th>
                                <th>AWAY TEAM</th>
                                <th>LEAGUE</th>
                                <th>COMPLETED</th>
                                
                            </tr>
                        </thead>
    <tbody>                    
    {loading?(
        <tr >
            <td colSpan="8">Loading...</td>
        </tr>
    ):(
        match.map((m,index)=>(
            <tr key={m.id}>
                <td>{m.date}</td>
                <td>{m.time}</td>
                <td>{m.home_team}</td>
                <td>{m.home_score}-{m.away_score}</td>
                <td>{m.away_team}</td>
                <td>{m.league}</td>
                <td>{m.completed?"Yes":"No"}</td>
            </tr>
        ))
    )}
    </tbody>
    </table>
    </>
)
}
export default MatchList;