import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Team from './pages/Team'
import Match from './pages/Match'
import League from './pages/League'
import Player from './pages/Player'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FootballProvider from './components/FootballContext'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoutes'
import Players from './pages/Players'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route
            element={
              <FootballProvider>
                <ProtectedRoute />
              </FootballProvider>
            }
          >
            {/*Protected Routes*/}
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/match" element={<Match />} />
            <Route path="/league" element={<League />} />
            <Route path='/players' element={<Players/>}/>
            <Route path="/player/:id" element={<Player />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
