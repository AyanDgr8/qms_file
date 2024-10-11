// src/components/Main/Main.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';

import Landing from '../routes/Landing/Landing';

export default function Main(){
    return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </div>
        </Router>
    </>
    );
}    