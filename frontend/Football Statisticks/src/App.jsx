import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Team from './pages/Team'
import Match from './pages/Match'
import League from './pages/League'
import Player from './pages/Player'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FootballProvider from './components/FootballContext'
function App() {
  return (
    <>
      <BrowserRouter>
        <FootballProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/match" element={<Match />} />
            <Route path="/league" element={<League />} />
            <Route path="/player" element={<Player />} />
          </Routes>
        </FootballProvider>
      </BrowserRouter>
    </>
  )
}

export default App
