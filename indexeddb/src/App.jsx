import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Post from './Post'
import Get from './Get';
import Update from './Update';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/get" element={<Get />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
