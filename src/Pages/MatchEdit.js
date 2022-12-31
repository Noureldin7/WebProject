import React, { useEffect, useState } from "react";

import {patch,get} from "../utils/APICallers"

import "../Styles/Form.css";
import "../Styles/reservation.css";
import dummyFlag from "../Resources/Images/Flags/dummy.png"
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";


// function dateFormatter(date)
// {
//     var tempDate = new Date(date)
//     tempDate.setHours(tempDate.getHours()-2)
//     return tempDate.toISOString().slice(0,-1)
// }

function EditMatch() {
    const navigate = useNavigate()
    const [auth, setAuth] = useOutletContext();
    const [params, setParams] = useSearchParams();
    const matchId = params.get("id");
    const [match, setMatch] = useState({});
    const [firstFlag,setFirstFlag] = useState(dummyFlag);
    const [secondFlag,setSecondFlag] = useState(dummyFlag);
    const [stadiums,setStadiums] = useState([]);
    const [teams,setTeams] = useState([]);
    const [staff,setStaff] = useState([]);
    useEffect(()=>{
        get('http://localhost:3001/api/match/'+matchId,auth.token).then((res)=>{
            res.json().then(async (data)=>{
                var tempDate = new Date(data.dateTime)
                tempDate.setHours(tempDate.getHours()+2)
                setMatch({
                    firstTeam:data.firstTeam._id,
                    secondTeam:data.secondTeam._id,
                    stadium:data.stadium._id,
                    dateTime:tempDate.toISOString().slice(0,-1),
                    referee:data.referee._id,
                    firstLinesman:data.firstLinesman._id,
                    secondLinesman:data.secondLinesman._id,
                })
                setFirstFlag(data.firstTeam.flag)
                setSecondFlag(data.secondTeam.flag)
                await update(new Date(data.dateTime))
            })
        })
    },[matchId])
    var linesmen = staff.filter((member)=>{
        return member.type==="linesman"
    })
    // linesmen = [{name:"-",type:"linesman"},...linesmen]
    var refs = staff.filter((member)=>{
        return member.type==="referee"
    })
    // refs = [{name:"-",type:"referee"},...refs]
    // console.log(match)
    async function update(date)
    {
        await updateStadiums(date)
        await updateStaff(date)
        await updateTeams(date)
        // setTeams([...new Set([...teams,initData.firstTeam,initData.secondTeam])])
        // setStaff([...new Set([...staff,initData.firstLinesman,initData.secondLinesman,initData.referee])])
        // setStadiums([...new Set([...stadiums,initData.stadium])])
    }
    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setMatch({...match,[key]:value})
    }
    async function updateStadiums(date)
    {
        // console.log(date+'Z')
        // console.log(new Date(date,).)
        var response = await get('http://localhost:3001/api/stadium/',auth.token,{startDate:date,excludedId:matchId})
        if(response.status===200)
        {
            response = await response.json()
            // console.log(response)
            setStadiums([...response])
        }
    }
    async function updateTeams(date)
    {
        var response = await get('http://localhost:3001/api/team/',auth.token,{startDate:date,excludedId:matchId})
        if(response.status===200)
        {
            response = await response.json()
            // console.log(response)
            setTeams([...response])
        }
    }
    async function updateStaff(date)
    {
        var response = await get('http://localhost:3001/api/staff/',auth.token,{startDate:date,excludedId:matchId})
        if(response.status===200)
        {
            response = await response.json()
            // console.log(response)
            linesmen = staff.filter((member)=>{
                return member.type==="linesman"
            })
            refs = staff.filter((member)=>{
                return member.type==="referee"
            })
            setStaff([...response])
        }
    }
    async function handleEditMatch(e){
        try {
            e.preventDefault();
            const date = match.dateTime;
            console.log(date)
            var response = await patch('http://localhost:3001/api/match/edit/'+matchId,auth.token,{...match,dateTime:date});
            const status = response.status
            response = await response.json()
            console.log(response)
            if(status===200)
            {
                // e.target.submit()
                navigate("/")
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
        match && <form className="page" style={{height:"100%"}} action="/" onSubmit={handleEditMatch}>
            <div className="details" style={{height:"100%"}} id="#match">
                <section className="teams">
                    <div className="team" id="team">
                        <img src={firstFlag} alt="Error" height="100px" />
                        <select name="firstTeam" id="firstTeam" onChange={(e)=>{handleChange(e);setFirstFlag(e.target.children[e.target.selectedIndex].id)}}>
                            {teams.map((team)=>{
                                return <option label={team.name} selected={team._id===match.firstTeam} value={team._id} key={team._id+'1'} id={team.flag}></option>
                            })}
                        </select>
                    </div>
                    <div className="team" id="team">
                        <img src={secondFlag} alt="Error" height="100px" />
                        <select name="secondTeam" id="secondTeam" onChange={(e)=>{handleChange(e);setSecondFlag(e.target.children[e.target.selectedIndex].id)}}>
                            {teams.map((team)=>{
                                return <option label={team.name} selected={team._id===match.secondTeam} value={team._id} key={team._id+'2'} id={team.flag}></option>
                            })}
                        </select>
                    </div>
                </section>
                <section className="kickoff">
                    <label htmlFor="dateTime">Kick-Off</label>
                    <input type="datetime-local" name="dateTime" value={match.dateTime} onChange={(e)=>{handleChange(e);update(e.target.value);}}/>
                </section>
                <section className="stadium">
                    <label htmlFor="stadium">Stadium</label>
                    <select name="stadium" id="stadium" onChange={handleChange}>
                        {stadiums.map((stadium)=>{
                            return <option label={stadium.name} selected={stadium._id===match.stadium} value={stadium._id} key={stadium._id+'3'}></option>
                        })}
                    </select>
                </section>
                <section className="refs">
                    <div className="ref">
                        <label htmlFor="referee">Referee</label>
                        <select name="referee" id="referee" onChange={handleChange}>
                            {refs.map((member)=>{
                                return <option label={member.name} selected={member._id===match.referee} value={member._id} key={member._id+'4'}></option>
                            })}
                        </select>
                    </div>
                    <div className="ref">
                        <label htmlFor="firstLinesman">Lineman 1</label>
                        <select name="firstLinesman" id="firstLinesman" onChange={handleChange}>
                            {linesmen.map((member)=>{
                                return <option label={member.name} selected={member._id===match.firstLinesman} value={member._id} key={member._id+'5'}></option>
                            })}
                        </select>
                    </div>
                    <div className="ref">
                        <label htmlFor="secondLinesman">Lineman 2</label>
                        <select name="secondLinesman" id="secondLinesman" onChange={handleChange}>
                            {linesmen.map((member)=>{
                                return <option label={member.name} selected={member._id===match.secondLinesman} value={member._id} key={member._id+'6'}></option>
                            })}
                        </select>
                    </div>
                </section>
                <button type="submit">Confirm Modifications</button>
            </div>
        </form>
    );
}

export default EditMatch;