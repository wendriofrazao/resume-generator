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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchUser() {
    console.log("[Auth] Iniciando fetch do usuário...");

    try {
      setLoading(true);
      console.log("[Auth] Loading setado como true");

      const res = await Me();
      console.log("[Auth] Resposta da API recebida:", res);

      const data = await res.json();
      console.log("[Auth] Dados parseados do JSON:", data);

      if (data.user) {
        setUser(data.user);
        console.log("[Auth] Usuário atualizado no estado:", data.user);
      } else {
        console.warn("[Auth] Nenhum usuário encontrado na resposta:", data);
      }
    } catch (err) {
      console.error("[Auth] Erro ao buscar usuário:", err);
    } finally {
      setLoading(false);
      console.log("[Auth] Loading setado como false. Fetch do usuário finalizado.");
    }
  }

  fetchUser();
}, []);


  // Registro
  async function register(fullname, email, password) {
    setError(null);
    setLoading(true);
    try {
      const res = await registerUser(fullname, email, password);
      if (res.user) setUser(res.user);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Login
  async function login(email, password) {
    setError(null);
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.user) setUser(res.user);
      return res;
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function logout() {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      setError(err.message);
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
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
  setLoading(true);
  try {
    const res = await resetPassword(email, otpType, newPassword);
    return res;
  } catch (err) {
    setError(err.message);
    return { ok: false, message: err.message };
  } finally {
    setLoading(false);
  }
}

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
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


