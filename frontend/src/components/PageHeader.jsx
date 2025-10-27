import React from "react";
import resumeIcon from '../assets/img/curriculoIcon.svg'
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PageHeader() {

return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-40 px-0 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          {/* Page Header */}
          <div className="flex items-center space-x-5">
            <div className="w-8 h-8"> <img src={resumeIcon}/> </div>
            <span className="text-2xl font-semibold">
              Meus Currículos
            </span>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" className=" cursor-pointer border-[#2563EB]/30 text-[#2563EB] ">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ir a Dashboard
            </Button>
          </Link>
        </div>
        </div>
    </div>
)
}