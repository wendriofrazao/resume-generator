import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginNRegister } from "../pages/LoginNRegister";
import { DashBoard } from "../pages/DashBoard";
// import { Editation } from '../pages/Editation'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/auth" element={<LoginNRegister />} />
      {/* <Route path='/edit' element={<Editation/>} /> */}
    </Routes>
  );
};

export default AppRoutes;
