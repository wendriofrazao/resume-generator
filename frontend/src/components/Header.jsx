
export function Header (){
    return(

    <header className=" border-b/39 flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Logo e título */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full bg-[#4B4BFF]" />
        <span className="text-sm font-semibold text-[var(--color-text)]">Resume Maker</span>
      </div>

      {/* Navegação */}
      <nav className="flex items-center space-x-6 text-sm font-semibold text-black/90">
        <a href="#">Home</a>
        <a href="#">Sobre</a>
      </nav>

      {/* Botões */}
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-50">
          {/* <User size={16} /> */}
          <span>Entrar</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1.5 border rounded-md text-sm text-gray-700 bg-gray-100 hover:bg-gray-200">
          {/* <FileText size={16} /> */}
          <span>Cadastrar</span>
        </button>
      </div>
    </header>

    )
}



