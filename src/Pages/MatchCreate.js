import React, { useState } from "react";

import {post,get} from "../utils/APICallers"

import "../Styles/Form.css";
import "../Styles/reservation.css";
import dummyFlag from "../Resources/Images/Flags/dummy.png"
import { useNavigate, useOutletContext } from "react-router-dom";

    
function CreateMatch() {
    const navigate = useNavigate()
    const [auth,setAuth] = useOutletContext();
    const [firstFlag,setFirstFlag] = useState(dummyFlag);
    const [secondFlag,setSecondFlag] = useState(dummyFlag);
    const [stadiums,setStadiums] = useState(["Choose a Kick-Off Time"]);
    const [teams,setTeams] = useState([{flag:dummyFlag,name:"Choose a Kick-Off Time"}]);
    const [staff,setStaff] = useState([]);
    var linesmen = staff.filter((member)=>{
        return member.type==="linesman"
    })
    linesmen = [{name:"-",type:"linesman"},...linesmen]
    var refs = staff.filter((member)=>{
        return member.type==="referee"
    })
    refs = [{name:"-",type:"referee"},...refs]
    const [match, setMatch] = useState({
        firstTeam : "",
        secondTeam : "",
        referee : "",
        firstLinesman : "",
        secondLinesman : "",
        dateTime : "",
        stadium : ""
    });
    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setMatch({...match,[key]:value})
    }
    async function updateStadiums(e)
    {
        var response = await get('http://localhost:3001/api/stadium/',auth.token,{startDate:e.target.value})
        if(response.status===200)
        {
            response = await response.json()
            console.log(response)
            setStadiums(["-",...response])
        }
    }
    async function updateTeams(e)
    {
        var response = await get('http://localhost:3001/api/team/',auth.token,{startDate:e.target.value})
        if(response.status===200)
        {
            response = await response.json()
            console.log(response)
            setTeams([{flag:dummyFlag,name:"-"},...response])
        }
    }
    async function updateStaff(e)
    {
        var response = await get('http://localhost:3001/api/staff/',auth.token,{startDate:e.target.value})
        if(response.status===200)
        {
            response = await response.json()
            console.log(response)
            linesmen = staff.filter((member)=>{
                return member.type==="linesman"
            })
            refs = staff.filter((member)=>{
                return member.type==="referee"
            })
            setStaff(response)
        }
    }
    async function handleCreateMatch(e){
        try {
            e.preventDefault();
            var response = await post('http://localhost:3001/api/match/create',auth.token,match);
            const status = response.status
            response = await response.json()
            console.log(response)
            if(status===200)
            {
                navigate("/")
                // e.target.submit()
            }
            else
            {
                alert(response.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <form className="page" action="/" onSubmit={handleCreateMatch}>
            <div className="details" style={{height:"100%"}} id="#match">
                <div className="teams">
                    <div className="team" id="team">
                        <img src={firstFlag} alt="Error" height="100px" className="flag"/>
                        <select name="firstTeam" id="firstTeam" onChange={(e)=>{handleChange(e);setFirstFlag(e.target.children[e.target.selectedIndex].id)}}>
                            {teams.map((team)=>{
                                return <option label={team.name} value={team._id} key={team.flag} id={team.flag}></option>
                            })}
                        </select>
                    </div>
                    <div className="team" id="team">
                        <img src={secondFlag} alt="Error" height="100px" className="flag"/>
                        <select name="secondTeam" id="secondTeam" onChange={(e)=>{handleChange(e);setSecondFlag(e.target.children[e.target.selectedIndex].id)}}>
                            {teams.map((team)=>{
                                return <option label={team.name} value={team._id} key={team.flag} id={team.flag}></option>
                            })}
                        </select>
                    </div>
                </div>
                <label htmlFor="dateTime">Kick-Off</label>
                <input type="datetime-local" name="dateTime" value={match.dateTime} onChange={(e)=>{handleChange(e);updateStadiums(e);updateTeams(e);updateStaff(e)}}/>
                <label htmlFor="stadium">Stadium</label>
                <select name="stadium" id="stadium" onChange={handleChange}>
                    {stadiums.map((stadium)=>{
                        return <option label={stadium.name} value={stadium._id} key={stadium.name}></option>
                    })}
                </select>
                <div className="refs">
                    <label htmlFor="referee">Referee</label>
                    <select name="referee" id="referee" onChange={handleChange}>
                        {refs.map((member)=>{
                            return <option label={member.name} value={member._id} key={member.name}></option>
                        })}
                    </select>
                    <label htmlFor="firstLinesman">Lineman 1</label>
                    <select name="firstLinesman" id="firstLinesman" onChange={handleChange}>
                        {linesmen.map((member)=>{
                            return <option label={member.name} value={member._id} key={member.name}></option>
                        })}
                    </select>
                    <label htmlFor="secondLinesman">Lineman 2</label>
                    <select name="secondLinesman" id="secondLinesman" onChange={handleChange}>
                        {linesmen.map((member)=>{
                            return <option label={member.name} value={member._id} key={member.name}></option>
                        })}
                    </select>
                </div>
                <button type="submit">Schedule Fixture</button>
            </div>
        </form>
    );
}

export default CreateMatch;