import React from "react";
import "../App.css";
import "./Sidebar.css"
import {
  FaHome,
  FaUsers,
  FaShieldAlt,
  FaFutbol,
  FaChartBar,
  FaBookmark,
  FaHamburger
} from "react-icons/fa";
import Hamburger from"../assets/hamburger.svg"
import { useState } from "react";
import { NavLink } from "react-router";
function Sidebar() {
  const[isOpen,setIsOpen]=useState(false)
  function hamburger(){
setIsOpen(!isOpen)
  }
  return (
    <>
    <button onClick={hamburger}><img src={Hamburger} alt="Menu" /></button>
    <div className={`side-bar ${isOpen?"active":""}`}>
      
      <ul>
        <li><NavLink to="/"><FaHome /> Dashboard</NavLink></li>
        <li><NavLink to=""><FaUsers /> Players</NavLink></li>
        <li><NavLink to="/team"><FaShieldAlt /> Teams</NavLink></li>
        <li><NavLink to="/match"><FaFutbol /> Matches</NavLink></li>
      </ul>
    </div>
    </>
  )
}
export default Sidebar;