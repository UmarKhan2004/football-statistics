import React, { useContext } from "react";
import "../App.css"
import {FootballContext} from "./FootballContext";
function Statscard(){
  const{player,teams,match}=useContext(FootballContext);
  const totalGoals=player.reduce((sum,p)=>sum+p.goals,0);
  const topScorer=[...player].sort((a,b)=>b.goals-a.goals)[0];
    return(
        <div className="main-bar">
          <h1>Welcome Admin!</h1>
          <p>Closer look to what's happening in the world of football!</p>
          <div className="stats-highlight">
            <div className="stats-cards">
              <h1>{player.length}</h1>
              <p>Players</p>
            </div>
            <div className="stats-cards">
              <h1>{team.length}</h1>
              <p>Teams</p>
            </div>
            <div className="stats-cards">
              <h1>{match.length}</h1>
              <p>Matches</p>
            </div>
            <div className="stats-cards">
              <h1>{totalGoals}</h1>
              <p>Goals</p>
            </div>
            <div className="stats-cards">
              <h1>{topScorer?.goals?? 0}</h1>
              <p>{topScorer?.name??"No player"}</p>
            </div>
          </div>
        </div>

    )
}
export default Statscard;