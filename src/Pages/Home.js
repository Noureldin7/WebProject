import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {get} from "../utils/APICallers"

import "../Styles/fixtures.css"
import franceLogo from "../Resources/Images/Flags/France.png"
import argentinaLogo from "../Resources/Images/Flags/Argentina.webp"

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
var oldDay = "xday";
function Home() {
    const navigate = useNavigate();
    const [fixtures, setFixtures] = useState([]);
    fixtures.sort((a,b)=>{
        return new Date(a.dateTime) < new Date(b.dateTime) ? -1 : 1
    })
    fixtures.forEach((fixture)=>{
        fixture.day = weekDays[new Date(fixture.dateTime).getDay()];
    })
    console.log(fixtures)
    useEffect(()=>{
        var date6Days = new Date(Date.now());
        date6Days.setDate(date6Days.getDate()+7)
        get('http://localhost:3001/api/match',{fromDate:new Date(Date.now()),toDate:date6Days}).then((res)=>{
            res.json().then((data)=>{
                setFixtures(data);
            })
        })
    },[])
    return (
        fixtures && <>
            <div className="page">
                <h2>Fixtures</h2>
                <div className="matchDay">
                    {
                    fixtures.map((fixture)=>{
                        const printDay = fixture.day!==oldDay;
                        oldDay = fixture.day;
                        return (
                        <>
                            {
                                printDay?<h3>{fixture.day}</h3>:<></>
                            }
                            <div className="fixture" onClick={()=>navigate('/reservation?id='+fixture._id)}>
                                <div className="team" id="left">
                                    <span>{fixture.firstTeam.name}</span>
                                    <img src={franceLogo} alt="x" width="60px" />
                                </div>
                                <div className="time">
                                    <span>{String(new Date(fixture.dateTime).getUTCHours()).padStart(2,'0')+":"+String(new Date(fixture.dateTime).getUTCMinutes()).padStart(2,'0')}</span>
                                </div>
                                <div className="team" id="right">
                                    <img src={argentinaLogo} alt="x" width="60px" />
                                    <span>{fixture.secondTeam.name}</span>
                                </div>
                            </div>
                        </>
                        );
                    })}
                </div>
                <button onClick={()=>navigate('/match/create')}>Create a Match</button>
            </div>
        </>
    );
}

export default Home;

