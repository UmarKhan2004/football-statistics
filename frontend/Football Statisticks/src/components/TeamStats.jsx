import React, { useContext,  useState } from "react";
import { FootballContext } from "./FootballContext";
import { FaShieldAlt } from "react-icons/fa";
import "../App.css";
import "./TeamStats.css"
function TeamStats() {
    const { teamStanding, loading, league, fetchTeams } = useContext(FootballContext)
   const[addTeam,setAddTeam]=useState(false)
   const accessToken=localStorage.getItem("access")
   const [formData,setFormData]=useState({
     name: "",
    short_name: "",
    league: "",
    logo: null,
    founded_year: ""
   })
   const handleChange=(event)=>{
    if(event.target.name==="logo"){
        setFormData(prev=>({...prev,[event.target.name]:event.target.files[0]}))
    }
    else{
    setFormData(prev=>({...prev,[event.target.name]:event.target.value})
   )}
   
}
const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log(formData)
    const data=new FormData()
    data.append("name",formData.name)
    data.append("short_name",formData.short_name)
    data.append("league",formData.league)
    data.append("logo",formData.logo)
    data.append("founded_year",formData.founded_year)
    data.forEach((entry,data)=>{
console.log(data,entry)
    })
     try {
        const response = await fetch(
            "https://football-statistics-1.onrender.com/footballapp/teams/",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: data,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Team creation failed:", errorData);
            return;
        }

        const newTeam = await response.json();

        console.log("Team created:", newTeam);

        setFormData({
            name: "",
            short_name: "",
            league: "",
            logo: null,
            founded_year: "",
        });

        setAddTeam(false);
        fetchTeams()

    } catch (error) {
        console.error("Error creating team:", error);
    }
};
   console.log(addTeam)
   console.log(formData)
    const [searchQuerry, setSearchQuerry] = useState("")
    const filteredTeam = teamStanding.filter((item) => {
        const querry = searchQuerry.toLowerCase();
        return (
            item.team.toLowerCase().includes(querry) ||
            item.league.toLowerCase().includes(querry)
        );
    })
    return (
        <>
            <div className="team-page">
                <div className="team-header">
                    <h2>All Teams</h2>

                    <div className="actions">
                        <input
                            value={searchQuerry}
                            onChange={(e) => setSearchQuerry(e.target.value)}
                            type="text"
                            placeholder="Search team..."
                        />

                        <button onClick={()=>setAddTeam(prev=>!prev)}>+ Add Team</button>
                    </div>
                </div>
<div className="form">
                    {addTeam&&<form action="" onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="name" type="text" placeholder="Team" />
                        <input onChange={handleChange} name="short_name" type="text" placeholder="Short Name"/>
                        <label>Choose League:</label>
                       <select name="league" id=""
                       value={formData.league}
                       onChange={handleChange}
                       >
                        <option value="" disabled>--Select an Option</option>
                        {league&&league.map((item)=>(
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                       </select>
                        <input onChange={handleChange} name="logo" type="file" placeholder="logo"/>
                        <input onChange={handleChange} name="founded_year" type="number" placeholder="founded_year" />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={()=>setAddTeam(prev=>!prev)}>Cancel</button>
                    </form>}
                </div>

                <table className="team-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>League</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeam.length > 0 ? (
                            filteredTeam.map((team, index) => (
                                <tr key={team.id}>
                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="team-info">
                                            <FaShieldAlt size={40} color="#bdbdbd" />
                                            {team.team}
                                        </div>
                                    </td>

                                    <td>{team.league}</td>
                                    <td>{team.played}</td>
                                    <td>{team.win}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.loss}</td>
                                    <td>{team.goals_for}</td>
                                    <td>{team.goals_conceded}</td>

                                    <td>
                                        <span className="points">
                                            {team.points}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="no-results">
                                    No teams found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                            </div>
        </>
    )
}
export default TeamStats;
