import React from "react";
import "./App.css"

import Login from "./pages/login/Login";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route path="*" element={<AppRouter/>}/>
      </Routes>
    </Router>
  );
};

export default App;
