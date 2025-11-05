import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/userAuth.jsx";
import { getResumes, createResume, deleteResume, updateResumeTitle } from "../service/ResumeService.jsx";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Edit, Trash2, X } from "lucide-react";
import { useToast } from "../components/ui/use-toast.jsx";

export function Welcome() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [showCreateBox, setShowCreateBox] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);

  const { addToast } = useToast(); 

  // ==========================
  // Carrega currículos do usuário
  // ==========================
  useEffect(() => {
    if (user) fetchResumes();
  }, [user]);

  const fetchResumes = async () => {
    try {
      const { data, error } = await getResumes();
      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error("Erro ao carregar currículos:", error.message);
      addToast("Erro ao carregar currículos.", "error");
    } finally {
      setLoadingResumes(false);
    }
  };

  // ==========================
  // Atualizar título
  // ==========================
  const handleSaveTitle = async () => {
    if (!editTitle.trim() || !selectedResume) return;
    try {
      await updateResumeTitle(selectedResume._id, editTitle);
      addToast("Título atualizado com sucesso!", "success");
      setEditModal(false);
      setSelectedResume(null);
      fetchResumes();
    } catch (err) {
      console.error("Erro ao atualizar título:", err.message);
      addToast("Erro ao atualizar título.", "error");
    }
  };

  // ==========================
  // Criar novo currículo
  // ==========================
  const handleCreateResume = async () => {
    if (!newTitle.trim()) return;
    setIsCreating(true);
    try {
      const data = await createResume(newTitle);
      setNewTitle("");
      setShowCreateBox(false);

      setTimeout(() => {
        fetchResumes();
        navigate(`/dashboard/insering-data-resume/${data.data?._id || data.resume?.id}`);
        addToast("Currículo criado com sucesso!", "success");
      }, 300);
    } catch (error) {
      console.error("Erro ao criar currículo:", error.message);
      addToast("Erro ao criar currículo.", "error");
    } finally {
      setIsCreating(false);
    }
  };

  // ==========================
  // Editar currículo
  // ==========================
  const handleEditationResume = (id) => {
    navigate(`/dashboard/editation-data-resume/${id}`);
  };

  // ==========================
  // Deletar currículo
  // ==========================
  const handleDeleteResume = async (id) => {
    try {
      await deleteResume(id);
      addToast("Currículo removido com sucesso.", "warning");
      fetchResumes();
    } catch (error) {
      console.error("Erro ao excluir currículo:", error.message);
      addToast("Erro ao excluir currículo.", "error");
    }
  };

  // ==========================
  // Renderização
  // ==========================
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

        {/* Caixa de criação */}
        {showCreateBox && (
          <div className="animate-scale-in fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Criar Novo Currículo</h3>
                <button
                  onClick={() => setShowCreateBox(false)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Digite o título do currículo..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
                onKeyPress={(e) => e.key === "Enter" && handleCreateResume()}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateBox(false)}
                  className="px-4 cursor-pointer py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateResume}
                  disabled={isCreating || !newTitle.trim()}
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition"
                >
                  {isCreating ? "Criando..." : "Criar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de currículos */}
        {loadingResumes ? (
          <p className="text-center text-gray-500">Carregando currículos...</p>
        ) : resumes.length === 0 ? (
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
                onMouseEnter={() => setHoveredId(resume._id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative border rounded-lg p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                {/* Ícone de edição no canto superior direito */}
                {hoveredId === resume._id && (
                  <button
                    onClick={() => {
                      setEditModal(true);
                      setSelectedResume(resume);
                      setEditTitle(resume.title);
                    }}
                    className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-blue-600 transition"
                  >
                    <Edit size={25} />
                  </button>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-1">{resume.title}</h3>
                  <p className="text-sm text-gray-500">
                    Atualizado em{" "}
                    {new Date(resume.updatedAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEditationResume(resume._id)}
                    className="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-3 py-2 rounded-md transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteResume(resume._id)}
                    className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-2 rounded-md transition flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de edição de título */}
        {editModal && (
          <div className="animate-scale-in fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Editar título</h2>
                <button onClick={() => setEditModal(false)}>
                  <X className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
                placeholder="Novo título..."
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditModal(false)}
                  className="px-4 py-2 cursor-pointer text-gray-600 hover:text-gray-800 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveTitle}
                  className="px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-md transition"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
