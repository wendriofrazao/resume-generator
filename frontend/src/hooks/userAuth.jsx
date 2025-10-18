import { createContext, useContext, useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  Me,
  sendOtp,
  verifyOtp,
  resetPassword
} from "../service/authService.jsx";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await Me()
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, []);

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
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Enviar OTP
  async function sendOtpEmail(email, otpType = "verify") {
    try {
      const res = await sendOtp(email, otpType);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Verificar OTP
  async function verifyOtpCode(email, otp, otpType = "verify") {
    try {
      const res = await verifyOtp(email, otp, otpType);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  // Resetar senha
  async function resetUserPassword(email, newPassword, otpType = "reset") {
    try {
      const res = await resetPassword(email, otpType, newPassword);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        sendOtpEmail,
        verifyOtpCode,
        resetUserPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

