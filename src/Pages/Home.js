import React, {useEffect, useState} from "react";
import { useOutletContext, useNavigate } from 'react-router-dom';
import {get} from "../utils/APICallers"

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
    const [fixtures, setFixtures] = useState([]);
    const [auth,setAuth] = useOutletContext();
    fixtures.sort((a,b)=>{
        return new Date(a.dateTime) < new Date(b.dateTime) ? -1 : 1
    })
    fixtures.forEach((fixture)=>{
        fixture.day = weekDays[new Date(fixture.dateTime).getDay()];
    })
    useEffect(()=>{
        var date6Days = new Date(Date.now());
        date6Days.setDate(date6Days.getDate()+7)
        get('http://localhost:3001/api/match',"",{fromDate:new Date(Date.now()),toDate:date6Days}).then((res)=>{
            res.json().then((data)=>{
                setFixtures(data);
            })
        })
    },[])
    console.log(auth)
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
                <section className="btns">
                    {auth.role==2&&<button onClick={()=>navigate('/match/create')}>Create a Match</button>}
                    {auth.role==2&&<button onClick={()=>navigate('/stadium/create')}>Create a Stadium</button>}
                    {auth.role==3&&<button onClick={()=>navigate('/admin/users')}>View Users</button>}
                </section>
            </div>
        </>
    );
}

export default Home;

