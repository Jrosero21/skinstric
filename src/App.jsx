// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Testing from "./pages/Testing";
import Result from "./pages/Result";

// Camera routes (parent + children)
import CameraLayout from "./pages/Camera/CameraLayout";
import CameraLoading from "./pages/CameraLoading";
import Capture from "./pages/Camera/Capture";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />

        {/* /camera -> layout keeps the MediaStream alive */}
        <Route path="/camera" element={<CameraLayout />}>
          {/* index == /camera */}
          <Route index element={<CameraLoading />} />
          {/* /camera/capture */}
          <Route path="capture" element={<Capture />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
