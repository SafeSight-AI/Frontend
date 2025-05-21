import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LiveMonitoring from "./pages/LiveMonitoring";
import AlertHistory from "./pages/AlertHistory";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="pt-16"></div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Frontend" replace />} />
          <Route path="/Frontend" element={<Home />} />
          <Route path="/live-monitoring" element={<LiveMonitoring />} />
          <Route path="/alert-history" element={<AlertHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
