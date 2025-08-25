// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Testing from "./pages/Testing";
import Result from "./pages/Result";

// Camera routes (parent + children keep stream alive)
import CameraLayout from "./pages/Camera/CameraLayout";
import CameraLoading from "./pages/CameraLoading";
import Capture from "./pages/Camera/Capture";

// After “Use This Photo”
import Select from "./pages/Select";

import Summary from "./pages/Summary";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* main */}
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />

        {/* camera flow */}
        <Route path="/camera" element={<CameraLayout />}>
          <Route index element={<CameraLoading />} />      {/* /camera */}
          <Route path="capture" element={<Capture />} />   {/* /camera/capture */}
        </Route>

        {/* post-capture */}
        <Route path="/select" element={<Select />} />

   
        <Route path="/summary" element={<Summary />} />

        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
