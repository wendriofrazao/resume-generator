import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/userAuth.jsx";
import { getResumes, createResume, deleteResume } from "../service/ResumeService.jsx";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Edit, Trash2, LogOut, X } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [showCreateBox, setShowCreateBox] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const { data, error } = await getResumes();
      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error("Erro ao carregar currículos:", error.message);
    } finally {
      setLoadingResumes(false);
    }
  };
 
 
 const handleCreateResume = async () => {
    if (!newTitle.trim()) return;
    try {
      const data = await createResume(newTitle);
      setNewTitle("");
      setShowCreateBox(false);
      fetchResumes();

      navigate(`/dashboard/insering-data-resume/${data.data?._id || data.resume?.id}`);
    } catch (error) {
      console.error("Erro ao criar currículo:", error.message);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await deleteResume(id);
      fetchResumes();
    } catch (error) {
      console.error("Erro ao excluir currículo:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
     <div className="bg-white border-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground font-semibold text-sm text-neutral-500">
              Bem-vindo de volta! Gerencie seus currículos aqui.
            </p>
          </div>
          <button
            onClick={() => setShowCreateBox(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" /> Novo Currículo
          </button>
        </div>

        {showCreateBox && (
          <div className="bg-gray-100 border rounded-lg p-5 mb-8 max-w-md mx-auto shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Criar Novo Currículo</h3>
              <button onClick={() => setShowCreateBox(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Digite o título do currículo..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCreateResume}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Criar
              </button>
            </div>
          </div>
        )}

{loadingResumes ? (
  <p className="text-center text-gray-500">Carregando currículos...</p>
) : resumes.length === 0 && !showCreateBox ? ( // 👈 só mostra se não tiver currículo e o box não estiver aberto
  <div className="flex flex-col items-center justify-center py-16 text-center rounded-md">
    <FileText className="w-16 h-16 text-gray-400 mb-4" />
    <p className="text-lg font-medium mb-4">Nenhum currículo ainda</p>
    <button
      onClick={() => setShowCreateBox(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
    >
      <Plus className="w-4 h-4" />
      Criar Primeiro Currículo
    </button>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {resumes.map((resume) => (
      <div
        key={resume._id}
        className="border rounded-lg p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition"
      >
        <div>
          <h3 className="text-lg font-semibold mb-1">{resume.title}</h3>
          <p className="text-sm text-gray-500">
            Atualizado em{" "}
            {new Date(resume.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-3 py-2 rounded-md"
          >
            Editar
          </button>
          <button
            onClick={() => handleDeleteResume(resume._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
          >
            Excluir
          </button>
        </div>
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  );
}
