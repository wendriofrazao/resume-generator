import React from "react";
import { LogOut } from "lucide-react";
import profile from "../assets/img/profileDefault.svg";
import { useAuth } from "../hooks/userAuth.jsx";
import Logo from "../assets/icon/Prancheta4.png";
import { useNavigate } from "react-router-dom";

export function LoggedHeader() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await logout();
    if (res) {
      navigate("/");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo e título */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo Resume Maker"
            className="w-10 h-10 "
          />
          <span
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
          >
            Resume Maker
          </span>
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center gap-4">
          {/* Botão sair */}
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline cursor-pointer">Sair</span>
          </button>

          {/* Imagem de perfil */}
          <div className="relative group">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt={`Foto de ${user.username}`}
                className="w-10 h-10 rounded-full object-cover cursor-pointer group-hover:ring-2 group-hover:ring-indigo-400 transition"
              />
            ) : (
              <img
                src={profile}
                alt="Foto padrão"
                className="w-10 h-10 rounded-full object-cover cursor-pointer group-hover:ring-2 group-hover:ring-indigo-400 transition"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
