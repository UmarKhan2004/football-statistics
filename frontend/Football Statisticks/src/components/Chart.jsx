import React, { useContext } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

function Chart({player}){
      if (!player) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Loading chart...
            </div>
        );
    }
const data=[
    {attribute:"Pace",value:player.pace??0},
    {attribute:"Shooting",value:player.shooting??0},
    {attribute:"Passing",value:player.passing??0},
    {attribute:"Dribbling",value:player.dribbling??0},
    {attribute:"Defending",value:player.defending??0},
    {attribute:"Physicality",value:player.physicality??0}
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
        name={player.name}
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
