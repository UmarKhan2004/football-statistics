import React, { useContext } from "react";
import { FootballContext } from "./FootballContext";
import "../pages/League.css";

function LeagueList() {
    const {
        league = [],
        teams = [],
        match = [],
        loading
    } = useContext(FootballContext);

    console.log("LeagueList data:", {
        league,
        teams,
        match,
        leagueIsArray: Array.isArray(league),
        teamsIsArray: Array.isArray(teams),
        matchIsArray: Array.isArray(match),
    });

    const safeLeagues = Array.isArray(league) ? league : [];
    const safeMatches = Array.isArray(match) ? match : [];

    const totalGoals = safeMatches
        .filter((m) => m.completed)
        .reduce((total, m) => {
            return total + (m.home_score || 0) + (m.away_score || 0);
        }, 0);

    return (
        <>
            <div className="section-headers">
                <h1>All Leagues</h1>
                <input
                    type="search"
                    placeholder="Search League.."
                    className="league-search-bar"
                />
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
                    {loading ? (
                        <tr>
                            <td colSpan="8">Loading...</td>
                        </tr>
                    ) : (
                        safeLeagues.map((l) => (
                            <tr key={l.id}>
                                <td>{l.name}</td>
                                <td>{l.country}</td>
                                <td>{Array.isArray(l.teams) ? l.teams.length : 0}</td>

                                <td>
                                    {safeMatches.filter(
                                        (m) => m.league === l.name
                                    ).length}
                                </td>

                                <td>
                                    {safeMatches
                                        .filter(
                                            (m) =>
                                                m.league === l.name &&
                                                m.completed
                                        )
                                        .reduce(
                                            (total, m) =>
                                                total +
                                                (m.home_score || 0) +
                                                (m.away_score || 0),
                                            0
                                        )}
                                </td>

                                <td>
                                    {l.is_active ? "Active" : "InActive"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

export default LeagueList;