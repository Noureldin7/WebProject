import React, {useEffect, useState} from "react";
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { demo_fixtures } from "../Static/Teams"
import Seat from "../Components/Seat"
import "../Styles/fixtures.css"
import "../Styles/reservation.css"

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
    const [reservedSeats,setReservedSeats] = useState([]);
    const [match,setMatch] = useState(demo_fixtures[parseInt(matchId)]);
    async function handleReserve()
    {
        alert("Success")
        navigate("/")
    }
    function seatGenerator(seatsPerRow,rowIndex)
    {
        var row = [];
        const rowChar = String.fromCharCode('A'.charCodeAt() + rowIndex);
        for (let index = 0; index < seatsPerRow; index++) {
            const rowNumber = rowChar + index
            const state = 0
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
    console.log(match)
    return (
        match && <>
            <div className="details">
                <section className="teams">
                    <div className="team" id="team">
                        <img src={match.firstTeam.flag} alt="x" height="100px" className="flag"/>
                        <span>{match.firstTeam.name}</span>
                    </div>
                    <div className="team" id="team">
                        <img src={match.secondTeam.flag} alt="x" height="100px" className="flag" />
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
                        <label htmlFor="referee">Referee:</label>
                        <h4 name="referee">{match.referee}</h4>
                        <label htmlFor="firstlinesman">Lineman 1:</label>
                        <h4 name="firstlinesman">{match.firstLinesman}</h4>
                        <label htmlFor="secondlinesman">Lineman 2:</label>
                        <h4 name="secondlinesman">{match.secondLinesman}</h4>
                </section>
                <section className="btns">
                    <button onClick={handleReserve}>Reserve Seats</button>
                </section>
            </div>
        </>
    );
}

export default Reservation;

