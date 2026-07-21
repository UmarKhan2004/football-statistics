import React, { createContext } from "react";
import {useState,useEffect} from "react";
  export const FootballContext=createContext()
export default function FootballProvider({children}){
    const[player,setPlayer]=useState([])
    const[team,setTeam]=useState([])
    const[league,setLeague]=useState([])
    const[match,setMatch]=useState([])
    const[playerStats,setPlayerStats]=useState([])
    const[teamStanding,setTeamStanding]=useState([])
    const[error,setError]=useState([])
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        Promise.all([
        //fetch player
        fetch("http://127.0.0.1:8000/footballapp/player/").then((res)=>res.json()),
//fetch team
fetch("http://127.0.0.1:8000/footballapp/teams/").then((res)=>res.json()),
    //fetch League
    fetch("http://127.0.0.1:8000/footballapp/league/").then((res)=>res.json()),
        //fetch Matches
    fetch("http://127.0.0.1:8000/footballapp/match/").then((res)=>res.json()),
    //fetch playerstats
    fetch("http://127.0.0.1:8000/footballapp/playerstats/").then((res)=>res.json()),
    //fetch teamstanding
    fetch("http://127.0.0.1:8000/footballapp/teamstanding/").then((res)=>res.json())
        ])
  .then(([playerData,teamData,leagueData,matchData,playerStatsData,teamStandingData])=>{
setPlayer(playerData);
setTeam(teamData);
setLeague(leagueData);
setMatch(matchData);
setPlayerStats(playerStatsData);
setTeamStanding(teamStandingData);
setLoading(false)
  })
  .catch((error)=>{
setError(error)
setLoading(false)
  })
},[])
return(
    <FootballContext.Provider value={{player,team,league,match,teamStanding,playerStats,loading,error}}>
        {children}
    </FootballContext.Provider>
)
}