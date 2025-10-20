// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.css'
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Cadastro" element={<Cadastro/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}