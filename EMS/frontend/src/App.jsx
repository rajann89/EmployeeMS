import React from "react";
import Login from "./Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Employee from "./Employee.jsx";
import Profile from "./Profile.jsx";
import Home from "./Home.jsx";
import AddEmployee from "./AddEmployee.jsx";
import Start from "./Start.jsx";

function App() {
  const token = document.cookie;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={token ? `/dashboard` : `/`}
          element={token ? <Dashboard /> : <Start />}
        >
          <Route path="/dashboard" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/profile/:id" element={<Profile />}></Route>
          <Route path="/dashboard/create" element={<AddEmployee />}></Route>
        </Route>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
