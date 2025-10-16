import { useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
//   getUser,
  sendOtp,
  verifyOtp,
  resetPassword
} from "../service/authService.jsx";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //   const [loading, setLoading] = useState(true);

  // Checa sessão ao montar
//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const res = await getUser();
//         if (res?.user) setUser(res.user);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadUser();
//   }, []);

  // Registro
  async function register(fullname, email, password) {
    setError(null);
    try {
      const res = await registerUser(fullname, email, password);
      if (res.user) setUser(res.user);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Login
  async function login(email, password) {
    setError(null);
    try {
      const res = await loginUser(email, password);
      if (res.user) setUser(res.user);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Logout
  async function logout() {
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

  // Enviar OTP
  async function sendOtpEmail(email) {
    try {
      const res = await sendOtp(email);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Verificar OTP
  async function verifyOtpCode(email, otp) {
    try {
      const res = await verifyOtp(email, otp);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Resetar senha
  async function resetUserPassword(email, newPassword) {
    try {
      const res = await resetPassword(email, newPassword);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  return {
    user,
    error,
    register,
    login,
    logout,
    sendOtpEmail,
    verifyOtpCode,
    resetUserPassword
  };
}
