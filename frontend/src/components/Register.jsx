import { useState } from "react";
import { useAuth } from "../hooks/userAuth.jsx";
import { GoogleLogin } from "@react-oauth/google";

export function Register() {
  const { register, googleLoginOrRegister } = useAuth(); 
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(fullname, email, password);
    if (res?.user) setMessage("Conta criada com sucesso!");
    else setMessage(res?.message || "Erro ao criar conta");
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await googleLoginOrRegister(token);
      if (res.success) {
        setMessage("Registro com Google realizado com sucesso!");
      } else {
        setMessage(res.message || "Falha no registro com Google");
      }
    } catch (err) {
      setMessage("Erro ao autenticar com Google");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Criar uma conta</h2>
        <p className="text-gray-500">Preencha os dados abaixo</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="João Silva"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          minLength={6}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Criar Conta
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
        <p className="mb-2">Ou faça o registro com</p>
        <GoogleLogin
          text="signup_with"
          onSuccess={handleGoogleRegister}
          onError={() => setMessage("Falha no registro com Google")}
        />
      </div>
    </div>
  );
}
