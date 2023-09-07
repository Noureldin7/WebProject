import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Reservation from "./Pages/Reservation";
import Error from "./Pages/Error";

function RouterX(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/reservation" element={<Reservation/>}/>
                    <Route path="*" element={<Error/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterX/>);
