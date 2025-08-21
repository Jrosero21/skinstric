// src/App.jsx
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Testing from "./pages/Testing"
import Results from "./pages/Results"
import Selfie from "./pages/Selfie"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/results" element={<Results />} />
        <Route path="/selfie" element={<Selfie />} />
      </Routes>
    </BrowserRouter>
  )
}
