import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './components/user';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<User/>} />
    </Routes>
  </Router>
  );
}

export default App;
