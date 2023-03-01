import React from "react";
import {Routes, Route} from 'react-router-dom'
import {Home} from "../pages/Home";
import {MyLib} from "../pages/MyLib";


export default function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mylib" element={<MyLib />} />
        </Routes>
        )
}