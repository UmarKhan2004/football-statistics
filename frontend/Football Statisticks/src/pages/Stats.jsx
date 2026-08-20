import React from "react";

import "./Stats.css"
function Stats({playerData}) {
  
    const statsData = [
        { label: "Goals", value: playerData.goals, max: 80 },
        { label: "Assists", value: playerData.assists, max: 120 },
        { label: "Matches", value: playerData.matches, max: 60 },
        { label: "Minutes Played", value: playerData.minutes_played, max: 8500 },
        { label: "Passing", value: playerData.passing, max: 100 },
        { label: "Shooting", value: playerData.shooting, max: 100 },
        { label: "Dribbles", value: playerData.dribbling, max: 100 },
        { label: "Pace", value: playerData.pace, max: 100 },
        { label: "physicality", value: playerData.physicality, max: 100 },
        { label: "defending", value: playerData.defending, max: 100 }
    ]
    return (
        <>
            <section className="stats-section">
                <div className="stats-title">
                    <h2>Season Stats</h2>
                    <span>2025/26</span>
                </div>
                <div className="stats-list">
                    {statsData.map((stat, index) => {
                        const percentage = (stat.value / stat.max) * 100;
                        return (
                            <div className="stat-item" key={index}>
                                <div className="stat-header">
                                    <span>{stat.label}</span>
                                    <span>{stat.value}</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${percentage}%` }}>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
export default Stats;