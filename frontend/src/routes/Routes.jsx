import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginNRegister } from "../pages/LoginNRegister";
import { DashBoard } from "../pages/DashBoard";
import { ProtectedRoute} from "../components/ProtectRoute"
import {EmailVerificationPage } from '../pages/EmailVerificationPage'
import { InseringData } from '../pages/InseringDataResume.jsx'

// import recursos
import { DicaDeCarreira } from '../pages/DicaDeCarreira.jsx'
import { AboutPages } from '../pages/AboutPages.jsx';
import { PrivatePolityc } from "../pages/Private.jsx";
import { TermService } from "../pages/TermUse.jsx";
import { ComoEscreverUmCv } from '../pages/ComoEscreverUmCv.jsx'

import { EditationResumes } from '../pages/EditDataResume.jsx'


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
      {<Route
        path="/auth/Account-Verification"
        element={
          <ProtectedRoute>
            <EmailVerificationPage/>
          </ProtectedRoute>
      }
      />}
      {<Route path='/dashboard/insering-data-resume/:resumeId' element={
        <ProtectedRoute>
          <InseringData/>
       </ProtectedRoute>
      } />}

      {<Route path='/dashboard/editation-data-resume/:resumeId' element={
        <ProtectedRoute>
          <EditationResumes/>
       </ProtectedRoute>
      } />}


      <Route path='/sobre' element={<AboutPages/>} />

      {/* rotas de recursos */}
      <Route path='/dicas-carreira' element={<DicaDeCarreira/>} />
      <Route path='/como-escrever-cv' element={<ComoEscreverUmCv/>} />
      <Route path='/termos' element={<TermService/>} />
      <Route path='/privacidade' element={<PrivatePolityc/>} />
      
    </Routes>
  );
};

export default AppRoutes;
