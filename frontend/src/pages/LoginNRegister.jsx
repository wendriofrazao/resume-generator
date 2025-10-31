import { useState } from "react";
import { FileText } from "lucide-react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginNRegister = () => {
  const [tabValue, setTabValue] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex hover:bg-black-500 items-center gap-2 text-sm text-muted-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Home
        </Link>
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Gerador de Currículos</h1>
          <p className="text-muted-foreground">Crie seu currículo profissional</p>
        </div>

        {/* Tabs */}
        <div className="w-full mb-4 grid grid-cols-2 rounded-xl bg-gray-200 p-1">
          <button
            className={`py-2 rounded-lg font-medium transition ${
              tabValue === "login"
                ? "bg-white text-gray-900"
                : "text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => setTabValue("login")}
          >
            Login
          </button>
          <button
            className={`py-2 rounded-lg font-medium transition ${
              tabValue === "signup"
                ? "bg-white text-gray-900"
                : "text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => setTabValue("signup")}
          >
            Criar Conta
          </button>
        </div>

        {/* Conteúdo */}
        {tabValue === "login" && <Login />}
        {tabValue === "signup" && <Register />}
      </div>
    </div>
  );
};

export default LoginNRegister;
