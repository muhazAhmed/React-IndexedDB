import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Post from './Post'
import Get from './Get';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/get" element={<Get />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
