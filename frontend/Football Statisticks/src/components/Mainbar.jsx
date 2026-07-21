import React from "react";
import "../App.css";
import Statscard from "./Statscard";
import Topscorer from "./Topscorer";
import FootballProvider from "./FootballContext";
function Mainbar({ children }) {
    return (
        <FootballProvider>
<div className="main-bar">
            <Statscard />
            <Topscorer />
        </div>
        </FootballProvider>
        
    )
}
export default Mainbar;