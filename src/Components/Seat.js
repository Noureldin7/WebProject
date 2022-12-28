import React, {useState} from "react";

import "../Styles/reservation.css"

function Seat() {
    function handleClick(){
        if(status===-1)
        {
            return;
        }
        else
        {
            setStatus((status + 1) % 2);
        }
    }
    const [status, setStatus] = useState(0);
    return (
        <div className={status===0 ? "seat free" : (status===1) ? "seat reserved" : "seat taken"} onClick={handleClick}></div>
    );
}

export default Seat;

