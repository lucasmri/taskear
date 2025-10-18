// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.css'
import Cadastro from './pages/Cadastro';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Cadastro" element={<Cadastro/>}/>
      </Routes>
    </BrowserRouter>
  )
}