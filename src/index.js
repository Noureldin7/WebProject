import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Reservation from "./Pages/Reservation";
import MatchCreate from "./Pages/MatchCreate";
import MatchEdit from "./Pages/MatchEdit";
import Error from "./Pages/Error";

function RouterX(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/reservation" element={<Reservation/>}/>
                    <Route path="/match">
                        <Route path="/match/create" element={<MatchCreate/>}/>
                        <Route path="/match/edit" element={<MatchEdit/>}/>
                    </Route>
                    <Route path="*" element={<Error/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterX/>);
