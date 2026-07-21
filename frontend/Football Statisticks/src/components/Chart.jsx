import React, { useContext } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { FootballContext } from "./FootballContext";
function Chart(){

    const{player,loading}=useContext(FootballContext)
    
      if (loading || !player ||Array.isArray(player)&& player.length === 0) {
    return <div style={{ width: '100%', height: "350px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading chart...</div>;
  }
      const playerData = Array.isArray(player) ? player[0] : player;
      console.log(playerData)
const data=[
    {attribute:"Pace",value:playerData.pace??0},
    {attribute:"Shooting",value:playerData.shooting??0},
    {attribute:"Passing",value:playerData.passing??0},
    {attribute:"Dribbling",value:playerData.dribbling??0},
    {attribute:"Defending",value:playerData.defending??0},
    {attribute:"Physicality",value:playerData.physicality??0}
]
console.log(data)
return(
    <div style={{width:'100%',height:"350px"}}>
        <ResponsiveContainer>
    <RadarChart data={data}>
        <PolarGrid/>
        <PolarAngleAxis dataKey="attribute"/>
        <PolarRadiusAxis angle={30} domain={[0,100]}/>
        <Radar
        name={playerData.name}
        dataKey="value"
        stroke="#22c55e"
        fill="#22c55e"
        fillOpacity={0.6}
/>
    </RadarChart>
    </ResponsiveContainer>
    </div>
)
}
export default Chart;
