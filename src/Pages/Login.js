import React, {useState} from "react";

import {post} from "../utils/APICallers"

import "../Styles/Form.css";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useOutletContext();
    // console.log(role)
    const navigate = useNavigate()
    
    async function handleLogin(e){
        try {
            e.preventDefault();
            if(email && password)
            {
                var response = await post('http://localhost:3001/api/login',auth.token,{
                    email,
                    password
                });
                const status = response.status
                response = await response.json()
                const roleStr = response.user.role
                const isApproved = response.user.isApproved
                const token = response.token
                if(status===200)
                {
                    localStorage.setItem("token",token);
                    const role = roleStr==="customer"?1:(roleStr==="admin"?3:(isApproved&&roleStr==="manager"?2:1))
                    localStorage.setItem("role",role);
                    setAuth({token,role})
                    navigate("/")
                }
                else
                {
                    alert(response.error);
                }
            }
            else
            {
                console.log("first")
                alert("Populate the fields");
                //Replace with a modal
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <form className="login" action="/" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;