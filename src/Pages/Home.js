import React, {useState} from "react";

import "../Styles/fixtures.css"
import franceLogo from "../Resources/Images/Flags/France.png"
import argentinaLogo from "../Resources/Images/Flags/Argentina.webp"
import brazilLogo from "../Resources/Images/Flags/Brazil.png"
import croatiaLogo from "../Resources/Images/Flags/Croatia.png"

function Home() {
    return (
        <>
            <div className="page">
                <h2>Fixtures</h2>
                <div className="fixture">
                    <div className="team" id="left">
                        <span>France</span>
                        <img src={franceLogo} alt="x" width="60px" />
                    </div>
                    <div className="time">
                        <span>17:00</span>
                    </div>
                    <div className="team" id="right">
                        <img src={argentinaLogo} alt="x" width="60px" />
                        <span>Argentina</span>
                    </div>
                </div>
                <div className="fixture">
                    <div className="team" id="left">
                        <span>Brazil</span>
                        <img src={brazilLogo} alt="x" width="60px" />
                    </div>
                    <div className="time">
                        <span>17:00</span>
                    </div>
                    <div className="team" id="right">
                        <img src={croatiaLogo} alt="x" width="60px" />
                        <span>Croatia</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

