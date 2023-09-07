import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { demo_fixtures } from "../Static/Teams";

import "../Styles/fixtures.css"
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
function Home() {
    var oldDay = "xday";
    const navigate = useNavigate();
    const [fixtures, setFixtures] = useState(demo_fixtures);
    fixtures.sort((a,b)=>{
        return new Date(a.dateTime) < new Date(b.dateTime) ? -1 : 1
    })
    fixtures.forEach((fixture)=>{
        fixture.day = weekDays[new Date(fixture.dateTime).getDay()];
    })
    console.log(demo_fixtures)
    return (
        <>
            <div className="page">
                <h2>Fixtures</h2>
                <div className="matchDay">
                    {
                    fixtures.map((fixture)=>{
                        const printDay = fixture.day!=oldDay;
                        oldDay = fixture.day;
                        return (
                        <>
                            {
                                printDay?<h3>{fixture.day}</h3>:<></>
                            }
                            <div className="fixture" id="fixture" onClick={()=>navigate('/reservation?id='+fixture._id)}>
                                <div className="team" id="left">
                                    <span>{fixture.firstTeam.name}</span>
                                    <img src={fixture.firstTeam.flag} alt="x" height="50px" className="flag"/>
                                </div>
                                <div className="time">
                                    <span>{String(new Date(fixture.dateTime).getHours()).padStart(2,'0')+":"+String(new Date(fixture.dateTime).getMinutes()).padStart(2,'0')}</span>
                                </div>
                                <div className="team" id="right">
                                    <img src={fixture.secondTeam.flag} alt="x" height="50px" className="flag"/>
                                    <span>{fixture.secondTeam.name}</span>
                                </div>
                            </div>
                        </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;

