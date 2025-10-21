import React from "react";
import { LogOut } from 'lucide-react';
import profile from '../assets/img/profileDefault.svg'
import { useAuth } from '../hooks/userAuth.jsx';


export function LoggedHeader() {
   const { logout, user } = useAuth();

   const handleSubmit = async (event) => {
      event.preventDefault();
      const res = await logout();
    if (res) {
      navigate("/"); 
    }
  }
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-20 px-0 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-12">

          {/* Logo e título */}
          <div className="flex items-center space-x-5">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-lg font-semibold text-purple-900">
              Resume Maker
            </span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex items-center -mx-65 space-x-5">
          <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-md text-sm cursor-pointer hover:bg-gray-100">
           <LogOut size={14} />
            Sair
          </button>

            <div className='flex items-center gap-2 rounded-full text-sm size-12 cursor-pointer hover:bg-gray-200 hover:px-1 duration-100 ease-in'>
              {user?.profile_picture ? (
                    <img 
                      src={user.profile_picture} 
                      alt={`Foto de ${user.username}`}
                      className="rounded-2xl"
                    />
                  ) : (<img src={profile}/>)}
            </div>
          
        </div>
      </div>
    </header>
  );
}
