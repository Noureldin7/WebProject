import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

import "../Styles/Layout.css";

function Layout() {
    function handleSignout(){
        localStorage.removeItem("token");
        setToken(null);
    }
    const [token,setToken] = useState(localStorage.getItem("token")??null)
    return (
        <>
            <div className="layout">
                <div className="child-layout" id="left">
                    <Link className="Home" to={'/'}></Link>
                </div>
                {
                    token?
                        <div className="child-layout" id="right">
                            <Link className="btn-layout" to={'/login'}>View Profile</Link>
                            <Link className="btn-layout" to={'/'} onClick={handleSignout}>Signout</Link>
                        </div>
                    :
                        <div className="child-layout" id="right">
                            <Link className="btn-layout" to={'/login'}>Login</Link>
                            <Link className="btn-layout" to={'/signup'}>Signup</Link>
                        </div>
                }
            </div>
            <Outlet/>
        </>
    );
}

export default Layout;

