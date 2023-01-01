import React, {useEffect, useState} from "react";
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';

import Seat from "../Components/Seat"
import "../Styles/fixtures.css"
import "../Styles/reservation.css"
import { get,post } from "../utils/APICallers";

function toDateTimeStr(dateObj,retVal){
    var date = dateObj.toDateString()
    date = date.split(" ")
    date = date[0] + " " + date[2] + " " + date[1] + " " + date[3]
    var time = dateObj.toLocaleTimeString()
    time = time.split(":")
    time = time[0] + ":" + time[1] + time[2].slice(2)
    return retVal===0?date:time
}


function Reservation() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const matchId = params.get("id");
    const [auth,setAuth] = useOutletContext();
    const [reservedSeats,setReservedSeats] = useState([]);
    const [match,setMatch] = useState();
    console.log(reservedSeats)
    async function handleReserve()
    {
        const payload = {
            matchID:matchId,
            seats:reservedSeats
        }
        await post('http://localhost:3001/api/reserve',auth.token,payload)
        navigate("/")
    }
    function seatGenerator(seatsPerRow,rowIndex)
    {
        var row = [];
        const rowChar = String.fromCharCode('A'.charCodeAt() + rowIndex);
        for (let index = 0; index < seatsPerRow; index++) {
            const rowNumber = rowChar + index
            const state = match.seats.includes(rowNumber)?-1:0
            row.push(<Seat rowNumber={rowNumber} reservedSeats={reservedSeats} setReservedSeats={setReservedSeats} state={state}/>);
        }
        return row;
    }
    function rowGenerator(rows,seatsPerRow)
    {
        var stadium = [];
        for (let index = 0; index < rows; index++) {
            stadium.push(<div className="row">{seatGenerator(seatsPerRow,index)}</div>);
        }
        return stadium;
    }
    // console.log(match)
    useEffect(()=>{
        get('http://localhost:3001/api/match/'+matchId,auth.token).then((res)=>{
            res.json().then((data)=>{
                setMatch(data);
            })
        })
    },[matchId])
    return (
        match && <>
            <div className="details">
                <section className="teams">
                    <div className="team" id="team">
                        <img src={match.firstTeam.flag} alt="x" height="100px" />
                        <span>{match.firstTeam.name}</span>
                    </div>
                    <div className="team" id="team">
                        <img src={match.secondTeam.flag} alt="x" height="100px" />
                        <span>{match.secondTeam.name}</span>
                    </div>
                </section>
                <section className="kickoff">
                    <label htmlFor="dateTime">Kick-Off:</label>
                    <h4>{toDateTimeStr(new Date(match.dateTime),0)}</h4>
                    <h4>{toDateTimeStr(new Date(match.dateTime),1)}</h4>
                </section>
                <section className="stadium">
                    <h3>{match.stadium.name}</h3>
                    <div className="seats">
                        {
                            rowGenerator(match.stadium.rows,match.stadium.seatsPerRow)
                        }
                    </div>
                </section>
                <section className="refs">
                    <div className="ref">
                        <label htmlFor="referee">Referee:</label>
                        <h4 name="referee">{match.referee.name}</h4>
                    </div>
                    <div className="ref">
                        <label htmlFor="firstlinesman">Lineman 1:</label>
                        <h4 name="firstlinesman">{match.firstLinesman.name}</h4>
                    </div>
                    <div className="ref">
                        <label htmlFor="secondlinesman">Lineman 2:</label>
                        <h4 name="secondlinesman">{match.secondLinesman.name}</h4>
                    </div>
                </section>
                <section className="btns">
                    {auth.role==2&&<button onClick={()=>navigate("/match/edit?id="+ matchId)}>Edit Fixture</button>}
                    {auth.role%3>0&&<button onClick={handleReserve}>Reserve Seats</button>}
                </section>
            </div>
        </>
    );
}

export default Reservation;

