import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Reservation from "./Pages/Reservation";
import ViewProfile from "./Pages/ViewProfile";
import AdminUsersView from "./Pages/AdminUsersView";
import MatchCreate from "./Pages/MatchCreate";
import StadiumCreate from "./Pages/StadiumCreate";
import MatchEdit from "./Pages/MatchEdit";
import Error from "./Pages/Error";
import ViewReservations from './Pages/ViewReservations';

function RouterX(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/reservation" element={<Reservation/>}/>
                    <Route path="/profile" element={<ViewProfile/>}/>
                    <Route path="/viewreservations" element={<ViewReservations/>}/>
                    <Route path="/admin">
                        <Route path="/admin/users" element={<AdminUsersView/>}/>
                    </Route>
                    <Route path="/stadium">
                        <Route path="/stadium/create" element={<StadiumCreate/>}/>
                    </Route>
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
