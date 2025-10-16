import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginNRegister } from "../pages/LoginNRegister";
import { DashBoard } from "../pages/DashBoard";
import { ProtectedRoute} from "../components/ProtectRoute"
import {EmailVerificationPage } from '../pages/EmailVerificationPage'
// import { Editation } from '../pages/Editation'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
      <Route path="/auth/login" element={<LoginNRegister type="login" />} />
      <Route path="/auth/signup" element={<LoginNRegister type="signup" />} />
      <Route
        path="/auth/Account-Verification"
        element={
          <ProtectedRoute>
            <EmailVerificationPage/>
          </ProtectedRoute>
        }
      />
      {/* <Route path='/edit' element={<Editation/>} /> */}
    </Routes>
  );
};

export default AppRoutes;
