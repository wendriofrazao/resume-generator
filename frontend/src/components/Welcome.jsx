import { Plus } from 'lucide-react';
import React from "react";

export function Welcome() { 
    return( 
        <div className="bg-white border-gray-200">
        <div className="max-w-7xl mx-40 px-0 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-12">

          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground font-bold text-[0.8rem] text-neutral-500">
              Bem-vindo de volta! Gerencie seus currículos aqui.
            </p>
          </div>

        </div>
        </div>
        </div>
  )
}
