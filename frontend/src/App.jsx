import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LiveMonitoring from "./pages/LiveMonitoring";
import AlertHistory from "./pages/AlertHistory";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="pt-16"></div>
      <Router basename="/Frontend"> {/* Ensures all routes are under /Frontend */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace/>}/>
          <Route path="/Home" element={<Home />} />
          <Route path="/live-monitoring" element={<LiveMonitoring />} />
          <Route path="/alert-history" element={<AlertHistory />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
