import { LogIn, FileText } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-20 px-0 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-12">

          {/* Logo e título */}
          <div className="flex items-center space-x-5">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-lg font-semibold text-purple-900">
              Resume Maker
            </span>
          </div>

          {/* NavBar*/}
          <nav className="flex items-center space-x-8">
            <a
              href="#"
              className="text-lg font-semibold text-black hover:text-gray-700"
            >
              Home
            </a>
            <a
              href="#"
              className="text-lg font-semibold text-black hover:text-gray-700"
            >
              Sobre
            </a>
          </nav>
        </div>

        {/* Botões */}
        <div className="flex items-center -mx-65 space-x-5">
          <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-100">
            <LogIn size={14} />
            Entrar
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-gray-200 border border-gray-300 cursor-pointer hover:bg-gray-200">
            <FileText size={14} />
            Cadastrar
          </button>
        </div>
    
      </div>
    </header>
  );
}
