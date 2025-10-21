import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/userAuth.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const {login, user, googleLoginOrRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res?.user) {
      setMessage("Conta logada com sucesso!");
      navigate("/dashboard");
    } else {
      setMessage(res?.message || "Erro ao entrar na sua conta");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await googleLoginOrRegister(token);
      if (res.success) {
        setMessage("Login com Google realizado com sucesso!");
        navigate("/dashboard");
      } else {
        setMessage(res.message || "Falha no login com Google");
      }
    } catch (err) {
      setMessage("Erro ao autenticar com Google");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Bem-vindo de volta</h2>
        <p className="text-gray-500">Entre com suas credenciais</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        {message && (
          <p
            className={`mt-2 ${
              message.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="mb-2">Ou faça login com</p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("Falha no login com Google")}
        />
      </div>
    </div>
  );
}
