import React, {useEffect, useState} from "react";
import { useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import {get, _delete} from "../utils/APICallers"

import "../Styles/fixtures.css"
import "../Styles/users.css"


function ViewReservations() {
    const [reservations, setReservations] = useState([]);
    const [params, setParams] = useSearchParams();
    const username = params.get("username");
    const [auth,setAuth] = useOutletContext();
    useEffect(()=>{
        console.log(auth.id)
        get('http://localhost:3001/api/'+username+'/reservations',auth.token).then((res)=>{
            res.json().then((data)=>{
                setReservations(data.reservations);
            })
        })
    },[])
    async function handleCancel(id)
    {
        const response = await _delete('http://localhost:3001/api/cancel-reservation',auth.token,{ticket:id})
        if(response.status===200)
        {
            alert("Success")
            setReservations(reservations.filter((res)=>res.ticketId!==id))
        }
        else
        {
            alert((await response.json()).error)
        }
    }
    return (
        <>
            <div className="page">
                <h2>Tickets</h2>
                <div className="matchDay">
                    {
                    reservations.map((reservation)=>{
                        return (
                        <>
                            <div className="fixture">
                                <div className="team" id="left">
                                    <img src={reservation.firstTeam.flag} alt="x" height="50px" />
                                </div>
                                <div>
                                    <span>VS</span>
                                </div>
                                <div className="team" id="right">
                                    <img src={reservation.secondTeam.flag} alt="x" height="50px" />
                                </div>
                                <span style={{textAlign:"center"}}>{reservation.seat}</span>
                                <button onClick={()=>handleCancel(reservation.ticketId)}>Cancel Ticket</button>
                            </div>
                        </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ViewReservations;

