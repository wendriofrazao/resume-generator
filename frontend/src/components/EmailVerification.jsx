import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/userAuth.jsx";

export function EmailVerification() {
  const { user, verifyOtpCode, sendOtpEmail } = useAuth();
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const hasSentOtp = useRef(false);

useEffect(() => {
  const sendInitialOtp = async () => {
    if (!user?.email || hasSentOtp.current) return;

    hasSentOtp.current = true; 

    try {
      setIsSendingOtp(true);
      const res = await sendOtpEmail(user.email, "verify");
      if (!res.ok) {
        setError(res.message || "Falha ao enviar o código. Tente novamente.");
      } else {
        console.log("OTP enviado para:", user.email);
      }
    } catch (err) {
      setError(err.message || "Erro ao enviar o código.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  sendInitialOtp();
}, [user, sendOtpEmail, hasSentOtp]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; 
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (!user?.email) {
      setError("Usuário não encontrado.");
      setIsLoading(false);
      return;
    }

    const otp = code.join("");
    if (otp.length < 6) {
      setError("Por favor, preencha todos os 6 dígitos.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await verifyOtpCode(user.email, otp);
      if (res.ok) {
        console.log("Email verified!");
        setSuccess(true);
      } else {
        setError(res.message || "Código inválido.");
      }
    } catch (err) {
      setError(err.message || "Algo deu errado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Verify Your Email
      </h2>

      <p className="text-center text-gray-300 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>

      {isSendingOtp && (
        <p className="text-center text-gray-400 text-sm mb-4">
          Enviando código para <span className="text-emerald-400">{user?.email}</span>...
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
        <div className="flex space-x-2">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-10 h-10 text-center text-lg bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm">
            ✅ Email verificado com sucesso!
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-all duration-200 disabled:opacity-60"
        >
          {isLoading ? "Verificando..." : "Verificar Código"}
        </button>
      </form>
    </div>
  );
}

