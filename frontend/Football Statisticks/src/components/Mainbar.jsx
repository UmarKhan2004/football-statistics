import React from "react";
import "../App.css";
import Statscard from "./Statscard";
import Topscorer from "./Topscorer";
import FootballProvider from "./FootballContext";
function Mainbar() {
    return (
        
<div className="main-bar">
            <Statscard />
            <Topscorer />
        </div>
       
        
    )
}
export default Mainbar;