import React, { useState } from "react";

import {post} from "../utils/APICallers"

import "../Styles/Form.css";


function Signup() {
    const [user, setUser] = useState({
        username : "",
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        birthdate : "",
        gender : "",
        nationality : "",
        role : ""
    });;
    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setUser({...user,[key]:value})
    }
    async function handleSignUp(e){
        try {
            e.preventDefault();
            var response = await post('http://localhost:3001/api/signup',user);
            const status = response.status
            response = await response.json()
            console.log(response)
            if(status===200)
            {
                e.target.submit()
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
        <form className="signup" action="/login" onSubmit={handleSignUp}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={user.username} onChange={handleChange} />
            <label htmlFor="firstname">FirstName</label>
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
            <label htmlFor="lastname">LastName</label>
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} />
            <label htmlFor="birthdate">BirthDate</label>
            <input type="date" name="birthdate" value={user.birthdate} onChange={handleChange}/>
            <label htmlFor="gender">Gender</label>
            <div className="radios">
                <input type="radio" name="gender" value="M" onChange={handleChange} />
                <label>Male</label>
                <input type="radio" name="gender" value="F" onChange={handleChange} />
                <label>Female</label>
            </div>
            <label htmlFor="nationality">Nationality</label>
            <input type="text" name="nationality" onChange={handleChange} />
            <label htmlFor="role">Role</label>
            <div className="radios">
                <input type="radio" name="role" value="customer" onChange={handleChange} />
                <label>Customer</label>
                <input type="radio" name="role" value="manager" onChange={handleChange} />
                <label>Manager</label>
            </div>
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;