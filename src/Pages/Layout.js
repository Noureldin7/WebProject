import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

import "../Styles/Layout.css";

const logoImage = require('../Resources/Images/Logos/WorldCupLogo.png');

function Layout() {
    function handleSignout(){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        setAuth({token:null, role:0, id:null});
    }
    const [auth,setAuth] = useState({token:localStorage.getItem("token")??null, role:localStorage.getItem("role")??0, id:localStorage.getItem("id")??null})
    return (
        <>
            <div className="layout">
                <div className="child-layout" id="left">
                    <Link className="Home" to={'/'}>
                        <img src={String(logoImage)} alt="WorldCupIcon" className="logo"/>
                    </Link>
                </div>
                {
                    auth.role>0?
                        <div className="child-layout" id="right">
                            {auth.role<3&&<Link className="btn-layout" to={'/profile?id='+auth.id}>View Profile</Link>}
                            <Link className="btn-layout" to={'/'} onClick={handleSignout}>Signout</Link>
                        </div>
                    :
                        <div className="child-layout" id="right">
                            <Link className="btn-layout" to={'/login'}>Login</Link>
                            <Link className="btn-layout" to={'/signup'}>Signup</Link>
                        </div>
                }
            </div>
            <div className="PageData">
                <Outlet context={[auth,setAuth]}/>
            </div>
        </>
    );
}

export default Layout;

