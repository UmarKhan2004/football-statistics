import React from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Statscard from '../components/Statscard'
import Topscorer from '../components/Topscorer'
import TeamNav from "../components/TeamNav";
import TeamStats from "../components/TeamStats";
import FootballProvider from "../components/FootballContext";
function Team(){
    return(
        <><FootballProvider>
  <Navbar />

  <section className="hero">
    <Sidebar />

    <main className="main-content">
      <TeamNav />
      <TeamStats />
    </main>
  </section>
</FootballProvider>
        </>
    )
}
export default Team