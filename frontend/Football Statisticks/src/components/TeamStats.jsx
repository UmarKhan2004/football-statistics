import React, { useContext, useState } from "react";
import { FootballContext } from "./FootballContext";
import { FaShieldAlt } from "react-icons/fa";
import "../App.css";
import "./TeamStats.css";

function TeamStats() {
    // 1. Destructure 'teams' alongside 'teamStanding' and 'league'
    const { teams, teamStanding, loading, league, fetchTeams } = useContext(FootballContext);
    const [addTeam, setAddTeam] = useState(false);
    const accessToken = localStorage.getItem("access");

    const [formData, setFormData] = useState({
        name: "",
        short_name: "",
        league: "",
        logo: null,
        founded_year: ""
    });

    const handleChange = (event) => {
        if (event.target.name === "logo") {
            setFormData((prev) => ({ ...prev, logo: event.target.files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("short_name", formData.short_name);
        data.append("league", formData.league);
        data.append("founded_year", formData.founded_year);

        // Only append logo if a file was selected
        if (formData.logo) {
            data.append("logo", formData.logo);
        }

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
                console.error("Team creation failed:", errorData);
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
            if (fetchTeams) fetchTeams();

        } catch (error) {
            console.error("Error creating team:", error);
        }
    };

    const [searchQuerry, setSearchQuerry] = useState("");

    // 2. Filter over 'teams' (or fallback to 'teamStanding' if teams isn't populated yet)
    const dataSource = Array.isArray(teams) && teams.length > 0
        ? teams
        : Array.isArray(teamStanding)
            ? teamStanding
            : [];

    const filteredTeam = dataSource.filter((item) => {
        const querry = searchQuerry.toLowerCase();
        const teamName = item.name || item.team || "";
        const leagueName = typeof item.league === "string" ? item.league : (item.league_name || "");
        return (
            teamName.toLowerCase().includes(querry) ||
            leagueName.toLowerCase().includes(querry)
        );
    });

    return (
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
                    <button onClick={() => setAddTeam((prev) => !prev)}>+ Add Team</button>
                </div>
            </div>

            <div className="form">
                {addTeam && (
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={formData.name} name="name" type="text" placeholder="Team Name" required />
                        <input onChange={handleChange} value={formData.short_name} name="short_name" type="text" placeholder="Short Name" required />
                        <label>Choose League:</label>
                        <select
                            name="league"
                            value={formData.league}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>--Select an Option--</option>
                            {league && league.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <input onChange={handleChange} name="logo" type="file" accept="image/*" />
                        <input onChange={handleChange} value={formData.founded_year} name="founded_year" type="number" placeholder="Founded Year" required />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setAddTeam(false)}>Cancel</button>
                    </form>
                )}
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
                                        {team.name || team.team}
                                    </div>
                                </td>
                                <td>{team.league_name || team.league || "N/A"}</td>
                                <td>{team.played ?? 0}</td>
                                <td>{team.win ?? 0}</td>
                                <td>{team.draws ?? 0}</td>
                                <td>{team.loss ?? 0}</td>
                                <td>{team.goals_for ?? 0}</td>
                                <td>{team.goals_conceded ?? 0}</td>
                                <td>
                                    <span className="points">{team.points ?? 0}</span>
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
    );
}

export default TeamStats;