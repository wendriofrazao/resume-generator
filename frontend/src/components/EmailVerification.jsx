import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/userAuth.jsx";
import { useNavigate } from "react-router-dom";

export function EmailVerification() {
  const { user, verifyOtpCode, sendOtpEmail } = useAuth();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const hasSentOtp = useRef(false);
  const hasVerified = useRef(false);
  const isRedirecting = useRef(false); 
  const navigate = useNavigate();


  useEffect(() => {
    console.log("[EmailVerification] Checando status do usuário:", user);
    if (user?.isAccountVerified && !isRedirecting.current) {
      console.log("[EmailVerification] Usuário já verificado. Redirecionando para /dashboard");
      isRedirecting.current = true;
      navigate("/dashboard", { replace: true });
    }
  }, [user?.isAccountVerified, navigate]);

  useEffect(() => {
    console.log("[EmailVerification] useEffect executado - email:", user?.email);
    console.log("[EmailVerification] hasSentOtp.current:", hasSentOtp.current);
    console.log("[EmailVerification] user.isAccountVerified:", user?.isAccountVerified);
    
    // ✅ Não enviar OTP se:
    // - Não há email
    // - Já enviou antes
    // - Usuário já está verificado
    // - Está verificando
    // - Está redirecionando
    if (!user?.email || 
        hasSentOtp.current || 
        user?.isAccountVerified || 
        verifying ||
        isRedirecting.current) {
      console.log("[EmailVerification] Não envia OTP: condições não atendidas");
      return;
    }

    const sendInitialOtp = async () => {
      console.log("[EmailVerification] Enviando OTP inicial para:", user.email);
      try {
        setIsSendingOtp(true);
        hasSentOtp.current = true; 

        const res = await sendOtpEmail(user.email, "verify");
        console.log("[EmailVerification] Resposta do envio inicial:", res);

        if (!res.ok) {
          console.error("[EmailVerification] Falha no envio inicial:", res.message);
          setError(res.message || "Falha ao enviar o código. Tente novamente.");
          hasSentOtp.current = false; // ✅ Permitir nova tentativa em caso de erro
        } else {
          console.log("[EmailVerification] OTP enviado com sucesso para:", user.email);
        }
      } catch (err) {
        console.error("[EmailVerification] Erro inesperado ao enviar OTP:", err);
        setError(err.message || "Erro ao enviar o código.");
        hasSentOtp.current = false; // ✅ Permitir nova tentativa em caso de erro
      } finally {
        setIsSendingOtp(false);
        console.log("[EmailVerification] Finalizado processo de envio inicial.");
      }
    };

    sendInitialOtp();
  }, [user?.email, user?.isAccountVerified]); 

  const handleChange = (value, index) => {
    if (/[^0-9]/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    console.log("[EmailVerification] Reenvio de OTP solicitado para:", user?.email);
    try {
      setIsSendingOtp(true);
      setError("");
      
      const res = await sendOtpEmail(user.email, "verify");
      console.log("[EmailVerification] Resposta do reenvio:", res);

      if (!res.ok) {
        console.error("[EmailVerification] Falha ao reenviar código:", res.message);
        setError(res.message || "Falha ao reenviar código.");
      } else {
        console.log("[EmailVerification] ✅ OTP reenviado com sucesso para:", user.email);
      }
    } catch (err) {
      console.error("[EmailVerification] Erro ao reenviar OTP:", err);
      setError(err.message || "Erro ao reenviar código.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (verifying || hasVerified.current || isRedirecting.current) {
      console.warn("[EmailVerification] Verificação já em andamento ou concluída. Ignorando.");
      return;
    }

    const otpCode = code.join("");
    console.log("[EmailVerification] Iniciando verificação do OTP:", otpCode);

    if (otpCode.length < 6) {
      console.warn("[EmailVerification] Código incompleto inserido.");
      setError("Por favor, insira os 6 dígitos.");
      return;
    }

    try {
      setVerifying(true);
      hasVerified.current = true;
      setError(""); 
      
      const res = await verifyOtpCode(user.email, otpCode);
      console.log("[EmailVerification] Resposta da verificação:", res);

      if (res.ok) {
        console.log("[EmailVerification] ✅ Código verificado com sucesso!");
      } else {
        console.error("[EmailVerification] ❌ Código inválido:", res.message);
        setError(res.message || "Código inválido. Tente novamente.");
        hasVerified.current = false;
        setCode(["", "", "", "", "", ""]);
      }
    } catch (err) {
      console.error("[EmailVerification] Erro ao verificar OTP:", err);
      setError(err.message || "Erro ao verificar código.");
      hasVerified.current = false;
    } finally {
      setVerifying(false);
    }
  };

  if (isRedirecting.current) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Verificação de E-mail
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Digite o código enviado para <strong>{user?.email}</strong>
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleVerify} className="flex flex-col items-center">
          <div className="flex gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={verifying || isRedirecting.current}
                className="w-10 h-10 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={verifying || isRedirecting.current}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {verifying ? "Verificando..." : "Verificar Código"}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={isSendingOtp || verifying || isRedirecting.current}
          className="mt-4 text-blue-600 text-sm hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSendingOtp ? "Reenviando..." : "Reenviar código"}
        </button>
      </div>
    </div>
  );
}

