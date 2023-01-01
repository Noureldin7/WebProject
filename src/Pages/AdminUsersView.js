import React, {useEffect, useState} from "react";
import { useOutletContext, useNavigate } from 'react-router-dom';
import {get, patch, _delete} from "../utils/APICallers"

import "../Styles/fixtures.css"
import "../Styles/users.css"

function AdminUsersView() {
    const [users, setUsers] = useState([]);
    const [unapprovedUsers, setUnapprovedUsers] = useState([]);
    const [auth,setAuth] = useOutletContext();
    useEffect(()=>{
        get('http://localhost:3001/api/admin/user',auth.token).then((res)=>{
            res.json().then((data)=>{
                setUsers(data.user);
            })
        })
        get('http://localhost:3001/api/admin/unapproved',auth.token).then((res)=>{
            res.json().then((data)=>{
                setUnapprovedUsers(data.user);
            })
        })
    },[])
    async function handleRemove(username)
    {
        const response = await _delete('http://localhost:3001/api/admin/'+username+'/delete',auth.token,{})
        if(response.status===200)
        {
            alert("User Removed")
            setUsers(users.filter((user)=>user.username!==username))
        }
        else
        {
            alert((await response.json()).message)
        }
    }
    async function handleApprove(username)
    {
        const response = await patch('http://localhost:3001/api/admin/'+username+'/approve',auth.token,{})
        if(response.status===200)
        {
            alert("User Approved")
            setUnapprovedUsers(unapprovedUsers.filter((user)=>user.username!==username))
        }
        else
        {
            alert((await response.json()).message)
        }
        
    }
    return (
        <>
            <div className="groupContainer">
                <div className="group">
                    <h2>Users</h2>
                    {
                        users.map((user)=>{
                        return (
                            <>
                            <div className="userContainer">
                                <span>{user.username}</span>
                                <button onClick={()=>handleRemove(user.username)}>Remove</button>
                            </div>
                        </>
                        );
                    })}
                </div>
                <div className="group">
                    <h2>Unapproved Users</h2>
                    {
                        unapprovedUsers.map((user)=>{
                            return (
                        <>
                            <div className="userContainer">
                                <span>{user.username}</span>
                                <button onClick={()=>handleApprove(user.username)}>Approve</button>
                            </div>
                        </>
                        );
                    })}
                </div>
                {/* <section className="btns">
                    {auth.role==2&&<button onClick={()=>navigate('/match/create')}>Create a Match</button>}
                    {auth.role==2&&<button onClick={()=>navigate('/stadium/create')}>Create a Stadium</button>}
                </section> */}
            </div>
        </>
    );
}

export default AdminUsersView;

