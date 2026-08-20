import React, { createContext, useEffect, useState } from "react";

export const FootballContext = createContext();

export default function FootballProvider({ children }) {
    const [player, setPlayer] = useState([]);
    const [team, setTeam] = useState([]);
    const [league, setLeague] = useState([]);
    const [match, setMatch] = useState([]);
    const [playerStats, setPlayerStats] = useState([]);
    const [teamStanding, setTeamStanding] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
            return null;
        }

        const response = await fetch(
            "http://127.0.0.1:8000/footballapp/token/refresh/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: refreshToken,
                }),
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        localStorage.setItem("access", data.access);

        return data.access;
    };

    const fetchData = async (url) => {
        let accessToken = localStorage.getItem("access");

        let response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Access token expired
        if (response.status === 401) {
            accessToken = await refreshAccessToken();

            // Refresh token also failed
            if (!accessToken) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/login";

                throw new Error("Session expired");
            }

            // Try the original request again
            response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        return data;
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    playerData,
                    teamData,
                    leagueData,
                    matchData,
                    playerStatsData,
                    teamStandingData,
                ] = await Promise.all([
                    fetchData(
                        "http://127.0.0.1:8000/footballapp/player/"
                    ),
                    fetchData(
                        "http://127.0.0.1:8000/footballapp/teams/"
                    ),
                    fetchData(
                        "http://127.0.0.1:8000/footballapp/league/"
                    ),
                    fetchData(
                        "http://127.0.0.1:8000/footballapp/match/"
                    ),
                    fetchData(
                        "http://127.0.0.1:8000/footballapp/playerstats/"
                    ),
                    fetchData(
                        "http://127.0.0.1:8000/footballapp/teamstanding/"
                    ),
                ]);

                setPlayer(playerData);
                setTeam(teamData);
                setLeague(leagueData);
                setMatch(matchData);
                setPlayerStats(playerStatsData);
                setTeamStanding(teamStandingData);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const fetchTeams = async () => {
        try {
            const data = await fetchData(
                "http://127.0.0.1:8000/footballapp/teams/"
            );

            setTeam(data);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

    return (
        <FootballContext.Provider
            value={{
                player,
                team,
                league,
                match,
                teamStanding,
                playerStats,
                loading,
                error,
                fetchTeams,
            }}
        >
            {children}
        </FootballContext.Provider>
    );
}