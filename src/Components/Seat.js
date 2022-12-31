import React, {useState} from "react";

import "../Styles/reservation.css"

function Seat({rowNumber,state,reservedSeats,setReservedSeats}) {
    const [status, setStatus] = useState(state);
    function handleClick(){
        if(status===-1)
        {
            return;
        }
        else if(status==0)
        {
            setStatus(1);
            setReservedSeats([...reservedSeats,rowNumber])
        }
        else
        {
            setStatus(0);
            setReservedSeats([...reservedSeats.filter((seat)=>{
                return seat !== rowNumber
            })])
        }
    }
    return (
        <div className={status===0 ? "seat free" : (status===1) ? "seat reserved" : "seat taken"} onClick={handleClick}></div>
    );
}

export default Seat;

