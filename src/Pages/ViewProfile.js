import React, { useState, useEffect } from "react";

import {get, patch, put} from "../utils/APICallers"

import "../Styles/Form.css";
import "../Styles/users.css";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";


function ViewProfile() {
    const navigate = useNavigate()
    const [auth, setAuth] = useOutletContext()
    const [params, setParams] = useSearchParams();
    const userId = params.get("id");
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState({});
    useEffect(()=>{
        get('http://localhost:3001/api/'+userId,auth.token).then((res)=>{
            res.json().then(async (data)=>{
                setUser(data)
                setUsername(data.username)
            })
        })
    },[])
    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setUser({...user,[key]:value})
    }
    function handleChangePass(e){
        const key = e.target.name
        const value = e.target.value
        setPass({...pass,[key]:value})
    }
    async function handleChangePassword(e){
        try {
            console.log(pass)
            e.preventDefault();
            if(pass.retypePassword!==pass.newPassword)
            {
                alert("Passwords Don't Match")
                return;
            }
            var response = await patch('http://localhost:3001/api/change-password',auth.token,{...pass,id:auth.id});
            const status = response.status
            response = await response.json()
            if(status===200)
            {
                alert("Success")
                setPass({password:"",newPassword:"",retypePassword:""});
            }
            else
            {
                alert(response.error);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async function handleEditProfile(e){
        try {
            e.preventDefault();
            var response = await put('http://localhost:3001/api',auth.token,user);
            const status = response.status
            response = await response.json()
            console.log(response)
            if(status===200)
            {
                alert("Success")
                setUsername(user.username)
            }
            else
            {
                alert(response.error);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="page">
            <div className="groupContainer" style={{width:"80%"}}>
                <form className="signup" action="/" onSubmit={handleEditProfile}>
                    <h2>Profile Details</h2>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} />
                    <label htmlFor="firstname">FirstName</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                    <label htmlFor="lastname">LastName</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                    {/* <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} /> */}
                    {/* <label htmlFor="birthdate">BirthDate</label>
                    <input type="date" name="birthdate" value={user.birthdate} onChange={handleChange}/> */}
                    {/* <label htmlFor="gender">Gender</label>
                    <div className="radios">
                    <input type="radio" name="gender" value="M" onChange={handleChange} />
                    <label>Male</label>
                    <input type="radio" name="gender" value="F" onChange={handleChange} />
                    <label>Female</label>
                </div> */}
                    <label htmlFor="nationality">Nationality</label>
                    <input type="text" name="nationality" value={user.nationality} onChange={handleChange} />
                    {/* <label htmlFor="role">Role</label>
                    <div className="radios">
                    <input type="radio" name="role" value="customer" onChange={handleChange} />
                        <label>Customer</label>
                        <input type="radio" name="role" value="manager" onChange={handleChange} />
                        <label>Manager</label>
                    </div> */}
                    <button type="submit" onClick={handleEditProfile}>Edit</button>
                </form>
                <form className="signup" action="/" onSubmit={handleChangePassword}>
                    <h2>Change Password</h2>
                    <label htmlFor="oldpassword">Old Password</label>
                    <input type="password" name="password" value={pass.password} onChange={handleChangePass} />
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" name="newPassword" value={pass.newPassword} onChange={handleChangePass} />
                    <label htmlFor="retypepassword">ReType Password</label>
                    <input type="password" name="retypePassword" value={pass.retypePassword} onChange={handleChangePass} />
                    <button type="submit" onClick={handleChangePassword}>Confirm</button>
                </form>
            </div>
            <button onClick={()=>navigate('/viewreservations?username='+username)}>My Reservations</button>
        </div>   
    );
}

export default ViewProfile;