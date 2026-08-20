import React, { useContext, useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Player.css"
import { FootballContext } from "../components/FootballContext";
import {
    FaCalendar,
    FaFutbol,
    FaRunning,
    FaStar,
    FaFlag,
    FaTshirt,
    FaWeightHanging,
    FaRulerVertical,
    FaClock,
    FaUserCircle
} from "react-icons/fa";
import Chart from "../components/Chart";
import { GiSoccerKick, GiWhistle } from "react-icons/gi";
import Stats from "./Stats";
import { useParams,Link } from "react-router-dom";
function Player() {
const [activeTab,setActiveTab]=useState("Overview")
const [transfers, setTransfers] = useState([]);
const [transferLoading, setTransferLoading] = useState(false)
const [matches, setMatches] = useState([]);
const [matchLoading, setMatchLoading] = useState(false);
    const { player, loading } = useContext(FootballContext)
    console.log(player)

    const { id } = useParams();
        useEffect(() => {
    const fetchTransfers = async () => {
        try {
            setTransferLoading(true);

            const response = await fetch(
                `http://127.0.0.1:8000/footballapp/transfers/?player=${id}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch transfers");
            }

            const data = await response.json();
            setTransfers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setTransferLoading(false);
        }
    };

    fetchTransfers();
}, [id]);
useEffect(() => {
    const fetchMatches = async () => {
        try {
            setMatchLoading(true);

            const response = await fetch(
                `http://127.0.0.1:8000/footballapp/player-matches/?player=${id}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch player matches");
            }

            const data = await response.json();
            setMatches(data);

        } catch (error) {
            console.error(error);
        } finally {
            setMatchLoading(false);
        }
    };

    fetchMatches();
}, [id]);
    if (loading) { return <h2>Loading....</h2> }
    const selectedPlayer = player.find(player => player.id === Number(id))
    if (!selectedPlayer) {
        return <h2>Player not found</h2>
    }

    return (
        <>
            <Navbar />
            <section className="hero">
                <Sidebar />
                <main className="content-player">
                    <section className="player-header">
                        <div className="player-image-container">
                            <FaUserCircle className="player-placeholder"/>
                        </div>
                        <div className="player-info">
                            <h1>{selectedPlayer.name}</h1>
                            <p>{selectedPlayer.position}</p>
                            <div className="brief-intro">
                                <p><GiSoccerKick /> {selectedPlayer.team}</p>
                                <p><FaCalendar /> {selectedPlayer.age}</p>
                                <p><FaRulerVertical /> {selectedPlayer.height}</p>
                                <p><FaWeightHanging /> {selectedPlayer.weight}</p>
                                <p><FaFutbol /> {selectedPlayer.preferred_foot}</p>
                            </div>
                        </div>
                    </section>
                    <section className="player-overview">
                        <div className="player-value-container">
                            <div className="value-card">
                                <p>Market Value</p>
                                <h3>${selectedPlayer.market_value}</h3>
                            </div>
                            <div className="value-card">
                                <p><FaFlag /> Nationality</p>
                                <h3>{selectedPlayer.nationality}</h3>
                            </div>
                            <div className="value-card">
                                <div className="card-title">
                                    <FaCalendar />
                                    <span>Joined</span>
                                </div>
                                <h3>{selectedPlayer.joined}</h3>
                            </div>
                        </div>
                        <div className="shirt-info">
                            <p>Shirt Number</p>
                            <h1>{selectedPlayer.shirt_number}</h1>
                            <p>Contract until</p>
                            <p>{selectedPlayer.contract_until}</p>
                        </div>
                    </section>
                    <nav className="player-nav">
    <ul>
        {[
            "Overview",
            "Statistics",
            "Matches",
            "Trophies",
            "Transfers",
            
        ].map((tab) => (
            <li key={tab}>
                <button
                    className={activeTab === tab ? "active-tab" : ""}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            </li>
        ))}
    </ul>
</nav>
                    {activeTab === "Overview" && (
    <>
        <section className="player-stats-container">
            <div className="player-statsCard">
                <FaRunning />
                <p>Matches</p>
                <h1>{selectedPlayer.matches}</h1>
                <p>All Competitions</p>
            </div>

            <div className="player-statsCard">
                <FaFutbol />
                <p>Goals</p>
                <h1>{selectedPlayer.goals}</h1>
                <p>All Competitions</p>
            </div>

            <div className="player-statsCard">
                <GiSoccerKick />
                <p>Assists</p>
                <h1>{selectedPlayer.assists}</h1>
                <p>All Competitions</p>
            </div>

            <div className="player-statsCard">
                <FaClock />
                <p>Minutes Played</p>
                <h1>8,764</h1>
                <p>All Competitions</p>
            </div>

            <div className="player-statsCard">
                <FaStar />
                <p>Average Rating</p>
                <h1>7.68</h1>
                <p>All Competitions</p>
            </div>
        </section>

        <section className="graph-containers">
            <div className="attribute-overview">
                <Chart player={selectedPlayer} />
            </div>

            <div className="heat-map">
                {/* Heat map later */}
            </div>

            <div className="season-stats">
                <Stats playerData={selectedPlayer} />
            </div>
        </section>
    </>
)}

{activeTab === "Statistics" && (
    <section className="tab-content">
        <h2>Statistics</h2>
        <Stats />
    </section>
)}

{activeTab === "Matches" && (
    <section className="matches-section">

        <div className="matches-header">
            <div>
                <h2>Match History</h2>
                <p>Matches played by {selectedPlayer.name}</p>
            </div>

            <span>{matches.length} Matches</span>
        </div>

        {matchLoading ? (
            <div className="match-loading">
                Loading matches...
            </div>
        ) : matches.length === 0 ? (
            <div className="no-matches">
                <h3>No matches found</h3>
                <p>
                    No match statistics have been recorded for{" "}
                    {selectedPlayer.name}.
                </p>
            </div>
        ) : (
            <div className="matches-list">

                {matches.map((match) => (
                    <div
                        className="match-card"
                        key={match.match_id}
                    >

                        <div className="match-date">
                            <FaCalendar />
                            <span>{match.date}</span>
                        </div>

                        <div className="match-teams">

                            <div className="match-team">
                                <strong>
                                    {match.home_team}
                                </strong>
                            </div>

                            <div className="match-score">
                                <span>
                                    {match.home_score}
                                </span>

                                <span>-</span>

                                <span>
                                    {match.away_score}
                                </span>
                            </div>

                            <div className="match-team away">
                                <strong>
                                    {match.away_team}
                                </strong>
                            </div>

                        </div>

                        <div className="player-match-stats">

                            <div>
                                <span>Minutes</span>
                                <strong>
                                    {match.minutes_played ?? 0}
                                </strong>
                            </div>

                            <div>
                                <span>Goals</span>
                                <strong>
                                    {match.goals ?? 0}
                                </strong>
                            </div>

                            <div>
                                <span>Assists</span>
                                <strong>
                                    {match.assists ?? 0}
                                </strong>
                            </div>

                            <div>
                                <span>Rating</span>
                                <strong>
                                    {match.rating ?? "—"}
                                </strong>
                            </div>

                            <div>
                                <span>Yellow</span>
                                <strong>
                                    {match.yellow_card ? "🟨" : "0"}
                                </strong>
                            </div>

                            <div>
                                <span>Red</span>
                                <strong>
                                    {match.red_card ? "🟥" : "0"}
                                </strong>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        )}

    </section>
)}

{activeTab === "Career" && (
    <section className="tab-content">
        <h2>Career</h2>
        <p>Career history will appear here.</p>
    </section>
)}

{activeTab === "Trophies" && (
    <section className="tab-content">
        <h2>Trophies</h2>

        {selectedPlayer.trophy?.length > 0 ? (
            <div className="trophy-list">
                {selectedPlayer.trophy.map((trophy) => (
                    <div className="trophy-card" key={trophy.id}>
                        <h3>{trophy.name}</h3>
                    </div>
                ))}
            </div>
        ) : (
            <p>No trophies recorded.</p>
        )}
    </section>
)}

{activeTab === "Transfers" && (
    <section className="transfer-section">
        <div className="transfer-header">
            <h2>Transfer History</h2>
            <p>{transfers.length} transfers</p>
        </div>

        {transferLoading ? (
            <div className="transfer-loading">
                Loading transfer history...
            </div>
        ) : transfers.length === 0 ? (
            <div className="no-transfers">
                <h3>No transfer history</h3>
                <p>No transfers have been recorded for {selectedPlayer.name}.</p>
            </div>
        ) : (
            <div className="transfer-list">
                {transfers.map((transfer) => (
                    <div className="transfer-card" key={transfer.id}>

                        <div className="transfer-date">
                            <FaCalendar />
                            <span>
                                {transfer.transfer_date || "Unknown date"}
                            </span>
                        </div>

                        <div className="transfer-teams">

                            <div className="transfer-team">
                                <span className="transfer-label">
                                    From
                                </span>

                                <h3>
                                    {transfer.team_from || "Free Agent"}
                                </h3>
                            </div>

                            <div className="transfer-arrow">
                                →
                            </div>

                            <div className="transfer-team">
                                <span className="transfer-label">
                                    To
                                </span>

                                <h3>
                                    {transfer.team_to || "Free Agent"}
                                </h3>
                            </div>

                        </div>

                        <div className="transfer-details">

                            <div>
                                <span>Type</span>
                                <strong>
                                    {transfer.transfer_type}
                                </strong>
                            </div>

                            <div>
                                <span>Fee</span>
                                <strong>
                                    {transfer.transfer_fee
                                        ? `$${Number(
                                            transfer.transfer_fee
                                        ).toLocaleString()}`
                                        : "Free"}
                                </strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong
                                    className={`transfer-status ${transfer.transfer_status?.toLowerCase()}`}
                                >
                                    {transfer.transfer_status}
                                </strong>
                            </div>

                            <div>
                                <span>League</span>
                                <strong>
                                    {transfer.league || "—"}
                                </strong>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )}
    </section>
)}


                   
                </main>
            </section>
        </>
    )
}
export default Player;