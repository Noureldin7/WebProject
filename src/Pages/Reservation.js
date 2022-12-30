import React, {useEffect, useState} from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';

import Seat from "../Components/Seat"
import "../Styles/fixtures.css"
import "../Styles/reservation.css"
import franceLogo from "../Resources/Images/Flags/France.png"
import argentinaLogo from "../Resources/Images/Flags/Argentina.webp"
import { get } from "../utils/APICallers";

function seatGenerator(seatsPerRow)
{
    var row = [];
    for (let index = 0; index < seatsPerRow; index++) {
        row.push(<Seat/>);
    }
    return row;
}

function rowGenerator(rows,seatsPerRow)
{
    var stadium = [];
    for (let index = 0; index < rows; index++) {
        stadium.push(<div className="row">{seatGenerator(seatsPerRow)}</div>);
    }
    return stadium;
}

function Reservation() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const matchId = params.get("id");
    const [match,setMatch] = useState();
    console.log(match)
    useEffect(()=>{
        get('http://localhost:3001/api/match/'+matchId).then((res)=>{
            res.json().then((data)=>{
                setMatch(data);
            })
        })
    },[matchId])
    return (
        match && <>
            <div className="page">                
                <div className="details">
                    <div className="teams">
                        <div className="team" id="team">
                            <img src={franceLogo} alt="x" width="120px" />
                            <span>{match.firstTeam.name}</span>
                        </div>
                        <div className="team" id="team">
                            <img src={argentinaLogo} alt="x" width="120px" />
                            <span>{match.secondTeam.name}</span>
                        </div>
                    </div>
                    <h3>{match.stadium.name}</h3>
                    <div className="stadium">
                    {
                        rowGenerator(match.stadium.rows,match.stadium.seatsPerRow)
                    }
                    </div>
                    <div className="refs">
                        <label htmlFor="referee">Referee:</label>
                        <h4 name="referee">{match.referee.name}</h4>
                        <label htmlFor="firstlinesman">Lineman 1:</label>
                        <h4 name="firstlinesman">{match.firstLinesman.name}</h4>
                        <label htmlFor="secondlinesman">Lineman 2:</label>
                        <h4 name="secondlinesman">{match.secondLinesman.name}</h4>
                    </div>
                    <button onClick={()=>navigate("/match/edit?id="+ matchId)}>Edit Fixture</button>
                </div>
            </div>
        </>
    );
}

export default Reservation;

