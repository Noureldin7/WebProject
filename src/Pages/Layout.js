import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

import "../Styles/Layout.css";

const logoImage = require('../Resources/Images/Logos/WorldCupLogo.png');

function Layout() {
    return (
        <>
            <div className="layout">
                <div className="child-layout" id="left">
                    <Link className="Home" to={'/'}>
                        <img src={String(logoImage)} alt="WorldCupIcon" className="logo"/>
                    </Link>
                </div>
                <div className="child-layout" id="right">
                    <div className="btn-layout">Demo</div>
                </div>
            </div>
            <div className="PageData">
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;

