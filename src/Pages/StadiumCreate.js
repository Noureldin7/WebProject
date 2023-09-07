import React, {useState} from "react";
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';

import Seat from "../Components/Seat"
import "../Styles/fixtures.css"
import "../Styles/reservation.css"


function StadiumCreate() {
    const navigate = useNavigate();
    const [auth,setAuth] = useOutletContext();
    const [stadium,setStadium] = useState({name:"",rows:1,seatsPerRow:1});
    function seatGenerator(seatsPerRow,rowIndex)
    {
        var row = [];
        const rowChar = String.fromCharCode('A'.charCodeAt() + rowIndex);
        for (let index = 0; index < seatsPerRow; index++) {
            const rowNumber = rowChar + index
            const state = -2
            row.push(<Seat rowNumber={rowNumber} reservedSeats={[]} setReservedSeats={null} state={state}/>);
        }
        return row;
    }
    function rowGenerator(rows,seatsPerRow)
    {
        var stadium = [];
        for (let index = 0; index < rows; index++) {
            stadium.push(<div className="row">{seatGenerator(seatsPerRow,index)}</div>);
        }
        return stadium;
    }
    async function handleCreateStadium()
    {
        alert("Success")
        navigate("/")
    }
    function handleChange(e){
        const key = e.target.name
        var value = e.target.value
        if(key==="rows")
        {
            if(value > 6)
            {
                value = 6;
            }
            if(value <= 0)
            {
                value = 1;
            }
        }
        if(key==="seatsPerRow")
        {
            if(value > 12)
            {
                value = 12;
            }
            if(value <= 0)
            {
                value = 1;
            }
        }
        setStadium({...stadium,[key]:value})
    }
    return (
        <>
            <div className="details">
                <div className="refs">
                        <label htmlFor="name">Stadium Name</label>
                        <input type="text" name="name" value={stadium.name} onChange={handleChange}/>
                        <label htmlFor="rows">Rows</label>
                        <input type="number" name="rows" value={stadium.rows} onChange={handleChange}/>
                        <label htmlFor="seatsPerRow">Seats Per Row</label>
                        <input type="number" name="seatsPerRow" value={stadium.seatsPerRow} onChange={handleChange}/>
                </div>
                <section className="stadium" style={{height:"275px"}}>
                    <div className="seats">
                        {
                            rowGenerator(stadium.rows,stadium.seatsPerRow)
                        }
                    </div>
                </section>
                <section className="btns">
                    {auth.role>1&&<button onClick={handleCreateStadium}>Create</button>}
                </section>
            </div>
        </>
    );
}

export default StadiumCreate;

