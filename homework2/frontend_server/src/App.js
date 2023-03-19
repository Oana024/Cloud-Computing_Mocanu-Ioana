import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages";
import Library from "./pages/library";
import Create from "./pages/create";
import Edit from "./pages/edit-book"

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/library' element={<Library/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/edit/:id' element={<Edit/>}/>
            </Routes>
        </Router>
    );
}

export default App;