import React, { createContext, useEffect, useState } from "react";

export const FootballContext = createContext();

// Define your API base URL dynamically
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export default function FootballProvider({ children }) {
    const [player, setPlayer] = useState([]);
    const [teams, setTeams] = useState([]);
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
            `${API_URL}/footballapp/refresh/`,
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

    const makeRequest = async (token) => {
        const headers = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return fetch(url, {
            headers,
        });
    };

    let response = await makeRequest(accessToken);

    if (response.status === 401 && accessToken) {
        accessToken = await refreshAccessToken();

        if (!accessToken) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            window.location.href = "/login";

            throw new Error("Session expired");
        }

        response = await makeRequest(accessToken);
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data;
};
   useEffect(() => {
    const loadData = async () => {
        const accessToken = localStorage.getItem("access");

        if (!accessToken) {
            setLoading(false);
            return;
        }

        try {
            const [
                playerData,
                teamData,
                leagueData,
                matchData,
                playerStatsData,
                teamStandingData,
            ] = await Promise.all([
                fetchData(`${API_URL}/footballapp/player/`),
                fetchData(`${API_URL}/footballapp/teams/`),
                fetchData(`${API_URL}/footballapp/league/`),
                fetchData(`${API_URL}/footballapp/match/`),
                fetchData(`${API_URL}/footballapp/playerstats/`),
                fetchData(`${API_URL}/footballapp/teamstanding/`),
            ]);

            setPlayer(playerData);
            setTeams(teamData);
            setLeague(leagueData);
            setMatch(matchData);
            setPlayerStats(playerStatsData);
            setTeamStanding(teamStandingData);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    loadData();
}, []);
    const fetchTeams = async () => {
        try {
            const data = await fetchData(`${API_URL}/footballapp/teams/`);
            setTeams(data);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

    return (
        <FootballContext.Provider
            value={{
                player,
                teams,
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