import React from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TeamStats from "../components/TeamStats";
function Team() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <Sidebar />
        <main className="main-content">
          <TeamStats />
        </main>
      </section>
    </>
  )
}
export default Team