import React from "react";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";

function Layout() {
    return (
        <>
            <div>
                <Link to={'/'}>Home</Link>
                <div style={{float:'right'}}>
                    <Link to={'/signin'}>Signin</Link>
                    <Link to={'/signup'}>Signup</Link>
                </div>
            </div>
            <Outlet/>
        </>
    );
}

export default Layout;

