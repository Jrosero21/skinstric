// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// These imports work whether the pages are .tsx or .jsx
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import Result from "./pages/Result";

// IMPORTANT:
// - main.tsx should NOT wrap <App/> with another <BrowserRouter>
// - Keep exactly one router in the app (here in App.jsx)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/result" element={<Result />} />
        {/* optional: catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
