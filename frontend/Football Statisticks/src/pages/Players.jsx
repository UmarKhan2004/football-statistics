import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FootballContext } from "../components/FootballContext";
import "./Players.css"
function Players() {
    const { player, loading } = useContext(FootballContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar />

            <section className="hero">
                <Sidebar />

                <main className="main-content">
                    <h1>All Players</h1>

                    <div className="players-list">
                        {player.map((p) => (
                            <div key={p.id} className="player-card">
                                
                                <h2>{p.name}</h2>

                                <p>
                                    Goals: {p.goals}
                                </p>

                                <p>
                                    Assists: {p.assists}
                                </p>

                                <Link to={`/player/${p.id}`}>
                                    View Player
                                </Link>

                            </div>
                        ))}
                    </div>

                </main>
            </section>
        </>
    );
}

export default Players;