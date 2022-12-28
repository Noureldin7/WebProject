import React, {useState} from "react";

import Seat from "../Components/Seat"
import "../Styles/fixtures.css"
import "../Styles/reservation.css"
import franceLogo from "../Resources/Images/Flags/France.png"
import argentinaLogo from "../Resources/Images/Flags/Argentina.webp"

function Reservation() {
    return (
        <>
            <div className="page">                
                <div className="details">
                    {/* <h2>Match Details</h2> */}
                    <div className="teams">
                        <div className="team" id="team">
                            <img src={franceLogo} alt="x" width="120px" />
                            <span>France</span>
                        </div>
                        <div className="team" id="team">
                            <img src={argentinaLogo} alt="x" width="120px" />
                            <span>Argentina</span>
                        </div>
                    </div>
                    <h3>Stadium X</h3>
                    <div className="stadium">
                        <div className="row">
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                        </div>
                        <div className="row">
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                        </div>
                        <div className="row">
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                            <Seat/>
                        </div>
                    </div>
                    <div className="refs">
                        <label htmlFor="referee">Referee:</label>
                        <h4 name="referee">RefX</h4>
                        <label htmlFor="firstlinesman">Lineman 1:</label>
                        <h4 name="firstlinesman">LinesY</h4>
                        <label htmlFor="secondlinesman">Lineman 2:</label>
                        <h4 name="secondlinesman">LinesZ</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reservation;

