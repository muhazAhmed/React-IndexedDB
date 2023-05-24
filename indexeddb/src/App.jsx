import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Post from './Post'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Post />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
