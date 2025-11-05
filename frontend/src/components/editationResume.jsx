"use client";

import React, { useState, useEffect } from "react";
import Handlebars from 'handlebars';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { TabsTrigger } from "./ui/tabs";
import { FileText, User, Briefcase, GraduationCap, Award, Download, Eye } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { useParams } from "react-router-dom";
import { ResumeProvide } from "../hooks/resumeHook";
import { updateResumeTemplate } from "../service/ResumeService.jsx";
import { useToast } from "./ui/use-toast.jsx";


export function EditationDatasResume() {
  const [tabValue, setTabValue] = useState("personal");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [templateHTML, setTemplateHTML] = useState("");
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  

  const resume = new ResumeProvide();
  const { resumeId } = useParams();
  const { addToast } = useToast();

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      id: null,
      fullname: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      summary: "",
      website: "",
      github: "",
      linkedin: ""
    },
    experiences: [],
    education: [],
    skills: [],
  });

  // ============ CARREGAR DADOS DO CURRÍCULO ============
  useEffect(() => {
    loadAvailableTemplates();
    loadResumeData();
  }, [resumeId]);

  const loadAvailableTemplates = async () => {
    try {
      const response = await resume.getAvailableTemplates();
      if (response.ok) {
        setAvailableTemplates(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar templates:", error);
    }
  };

 const loadResumeData = async () => {
  try {
    const res = await resume.getResumeComplete(resumeId);
    if (res.success && res.data) {
      const { personalDetails, experiences, education, skills, resume: resumeInfo } = res.data;

      if (resumeInfo?.templateId) {
        const templateId = typeof resumeInfo.templateId === 'object' 
          ? resumeInfo.templateId._id 
          : resumeInfo.templateId;
        
        setSelectedTemplateId(templateId);
        console.log("✅ Template salvo carregado:", templateId);
      }

      setResumeData({
        personalInfo: {
          id: personalDetails?._id || null,
          fullname: personalDetails?.fullname || "",
          email: personalDetails?.email || "",
          phone: personalDetails?.phone || "",
          city: personalDetails?.location?.city || "",
          state: personalDetails?.location?.state || "",
          country: personalDetails?.location?.country || "",
          summary: personalDetails?.summary || "",
          website: personalDetails?.website || "",
          github: personalDetails?.github || "",
          linkedin: personalDetails?.linkedin || "",
        },
        experiences: experiences?.map(exp => ({
          id: exp._id,
          backendId: exp._id,
          jobDegree: exp.jobDegree || "",
          company: exp.company || "",
          period: exp.period || "",
          description: exp.description || "",
          saved: true
        })) || [],
        education: education?.map(edu => ({
          id: edu._id,
          backendId: edu._id,
          degree: edu.degree || "",
          institution: edu.institution || "",
          period: edu.period || "",
          saved: true
        })) || [],
        skills: skills?.map(skill => ({
          id: skill._id,
          backendId: skill._id,
          skillName: skill.skillName || ""
        })) || [],
      });

      console.log("✅ Dados carregados com sucesso");
    }
  } catch (error) {
    console.error("❌ Erro ao carregar dados do currículo:", error);
  }
};

  // ============ TEMPLATE PREVIEW ============
  const loadTemplatePreview = async () => {
    if (!selectedTemplateId) return;
    
    setIsLoadingTemplate(true);
    try {
      const templateResponse = await resume.getTemplatePreview(selectedTemplateId);
      if (!templateResponse.ok) return;

      const template = templateResponse.data;
      const templateData = prepareTemplateData(resumeData);
      const compiledTemplate = Handlebars.compile(template.htmlContent);
      const renderedHtml = compiledTemplate(templateData);
      
      const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>${template.cssContent}</style>
          </head>
          <body>
            ${renderedHtml}
          </body>
        </html>
      `;

      setTemplateHTML(fullHTML);
    } catch (error) {
      console.error("Erro ao carregar preview:", error);
    } finally {
      setIsLoadingTemplate(false);
    }
  };

  const prepareTemplateData = (resumeData) => {
    return {
      fullName: resumeData.personalInfo?.fullname || "Seu Nome",
      cityCountry: `${resumeData.personalInfo?.city || ""}, ${resumeData.personalInfo?.country || ""}`,
      phone: resumeData.personalInfo?.phone || "(11) 99999-9999",
      email: resumeData.personalInfo?.email || "seu@email.com",
      website: resumeData.personalInfo?.website || "#",
      github: resumeData.personalInfo?.github || "#",
      linkedin: resumeData.personalInfo?.linkedin || "#",
      
      experiences: resumeData.experiences?.map(exp => ({
        jobTitle: exp.jobDegree || "Cargo",
        company: exp.company || "Empresa",
        startMonth: exp.period?.split(' - ')[0] || "Data Início",
        endMonth: exp.period?.split(' - ')[1] || "Data Fim",
        responsibilities: exp.description ? [{ text: exp.description }] : []
      })) || [],
      
      education: resumeData.education?.map(edu => ({
        degree: edu.degree || "Curso",
        university: edu.institution || "Instituição",
        startMonth: edu.period?.split(' - ')[0] || "Data Início",
        endMonth: edu.period?.split(' - ')[1] || "Data Fim"
      })) || [],
      
      skills: resumeData.skills?.map(skill => ({
        name: skill.skillName || skill
      })) || [],
      
      projects: []
    };
  };

  useEffect(() => {
    if (selectedTemplateId) {
      const timeoutId = setTimeout(() => {
        loadTemplatePreview();
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setTemplateHTML("");
    }
  }, [selectedTemplateId, resumeData]);

  // ============ HANDLER DE MUDANÇA DE TEMPLATE ============
  const handleTemplateChange = async (newTemplateId) => {
    setSelectedTemplateId(newTemplateId);
    
    if (newTemplateId && resumeId) {
      try {
        await updateResumeTemplate(resumeId, newTemplateId);
        console.log("✅ Template atualizado no currículo");
      } catch (error) {
        console.error("❌ Erro ao salvar template:", error);
      }
    }
  };

  // ============ HANDLER DE DOWNLOAD ============
  const handleDownloadPDF = async () => {
  if (!resumeId) {
    alert('ID do currículo não encontrado.');
    return;
  }

  setIsDownloading(true);
  try {
    const result = await resume.downloadPDF(resumeId);
    
    if (result.success) {
      console.log('✅ PDF baixado com sucesso:', result.fileName);
    } else {
      alert('Erro ao baixar PDF. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao baixar PDF.');
  } finally {
    setIsDownloading(false);
  }
};

  // ============ ATUALIZAR INFORMAÇÕES PESSOAIS ============
  const updatePersonalInfo = (campo, valor) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [campo]: valor,
      },
    }));
  };


  // ============ SALVAR DADOS PESSOAIS ============

  const HandlePersonalInfoEdit = async () => {
   try {
    console.log("Editando dados pessoais:", resumeData.personalInfo);
    console.log("resumeId:", resumeId);

    if (!resumeId) {
      console.error("Nenhum resumeId encontrado na URL!");
      addToast("Erro: ID do currículo não encontrado.", "error");
      return;
    }

    // Se essa bomba ainda não tiver um registro pessoal ele cria na base do ódio
    if (!resumeData.personalInfo.id) {
      console.log("📤 Criando novo bloco de informações pessoais...");

      const personalData = {
        fullname: resumeData.personalInfo.fullname,
        email: resumeData.personalInfo.email,
        phone: resumeData.personalInfo.phone,
        city: resumeData.personalInfo.city,
        state: resumeData.personalInfo.state,
        country: resumeData.personalInfo.country,
        summary: resumeData.personalInfo.summary,
        website: resumeData.personalInfo.website,
        github: resumeData.personalInfo.github,
        linkedin: resumeData.personalInfo.linkedin,
        resumeId
      };

      const response = await resume.PersonalResumeProvide(personalData);
      console.log("📬 Resposta ao criar:", response);

      if (response?.data?._id) {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            id: response.data._id
          }
        }));
        console.log("Novo personalInfo salvo com ID:", response.data._id);
        addToast("Informações pessoais criadas com sucesso!", "success");
      } else {
        console.error("Nenhum ID retornado ao criar dados pessoais");
        addToast("Erro ao criar informações pessoais.", "error");
      }
      return;
    }


    console.log("📤 Atualizando dados pessoais existentes...");
    const response = await resume.EditationPersonal(
      resumeId,
      resumeData.personalInfo.id,
      resumeData.personalInfo.fullname,
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.city,
      resumeData.personalInfo.state,
      resumeData.personalInfo.country,
      resumeData.personalInfo.summary,
      resumeData.personalInfo.website,
      resumeData.personalInfo.github,
      resumeData.personalInfo.linkedin
    );

    console.log("📬 Resposta ao atualizar:", response);

    if (response?.success) {
      console.log("Dados pessoais atualizados com sucesso!");
      addToast("Informações pessoais atualizadas com sucesso!", "success");
    } else {
      console.warn("⚠ Backend não confirmou sucesso na atualização.");
      addToast("Erro ao atualizar informações pessoais.", "error");
    }
  } catch (err) {
    console.error("Erro ao salvar dados pessoais:", err);
    addToast("Erro inesperado ao salvar dados pessoais.", "error");
  }
  };

  // ============ EXPERIÊNCIAS ============
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { 
          id: `temp_${Date.now()}`,
          jobDegree: "", 
          company: "", 
          period: "", 
          description: "",
          saved: false
        },
      ],
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const HandleExperienceSave = async (expId) => {
    const experience = resumeData.experiences.find(e => e.id === expId);
    
    if (!experience) {
      console.error("❌ Experiência não encontrada");
      addToast("Erro: experiência não encontrada.", "error");
      return;
    }

    if (!experience.backendId) {
      try {
        console.log("📤 Criando nova experiência...");
        const response = await resume.ExperienceResumeProvide(
          experience.jobDegree,
          experience.company,
          experience.description,
          experience.period,
          resumeId
        );



        if (response?.data?._id) {
          console.log("✅ Experiência criada com ID:", response.data._id);
          setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp =>
              exp.id === expId ? { 
                ...exp, 
                id: response.data._id,
                backendId: response.data._id, 
                saved: true 
              } : exp
            )
          }));
        }
        addToast("Experiência criada com sucesso!", "success");
      } catch (err) {
        console.error("❌ Erro ao criar experiência:", err);
        addToast("Erro ao criar experiência.", "error");
      }
    } else {
      try {
        console.log("📤 Atualizando experiência existente...");
        const response = await resume.EditationExperience(
          resumeId,
          experience.backendId,
          experience.jobDegree,
          experience.company,
          experience.description,
          experience.period
        );

        if (response?.success) {
          console.log("✅ Experiência atualizada com sucesso!");
          addToast("Experiência atualizada com sucesso!", "success");
        }
      } catch (err) {
        console.error("❌ Erro ao atualizar experiência:", err);
        addToast("Erro ao atualizar experiência.", "error");
      }
    }
  };

  const handleRemoveExperience = async (expId) => {
    const experience = resumeData.experiences.find(e => e.id === expId);
    
    if (experience?.backendId) {
      try {
        await resume.ExperienceRemoveProvide(resumeId, experience.backendId);
        console.log("✅ Experiência removida do backend");
        addToast("Experiência removida localmente.", "warning");
      } catch (error) {
        console.error("❌ Erro ao remover experiência:", error);
        addToast("Erro ao remover experiência.", "error");

      }
    }

    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== expId),
    }));
  };

  // ============ EDUCAÇÃO ============
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { 
          id: `temp_${Date.now()}`,
          degree: "", 
          institution: "", 
          period: "",
          saved: false
        },
      ],
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const HandleEducationSave = async (eduId) => {
    const education = resumeData.education.find(e => e.id === eduId);
    
    if (!education) {
      console.error("❌ Educação não encontrada");
      return;
    }

    if (!education.backendId) {
      try {
        console.log("📤 Criando nova educação...");
        const response = await resume.EducationResumeProvide(
          education.degree,
          education.institution,
          education.period,
          resumeId
        );

        if (response?.data?._id) {
          console.log("✅ Educação criada com ID:", response.data._id);
          setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
              edu.id === eduId ? { 
                ...edu, 
                id: response.data._id,
                backendId: response.data._id, 
                saved: true 
              } : edu
            )
          }));
          addToast("Educação criada com sucesso!", "success");
        }
      } catch (err) {
        console.error("❌ Erro ao criar educação:", err);
        addToast("Erro ao criar educação.", "error");

      }
    } else {
      try {
        console.log("📤 Atualizando educação existente...");
        const response = await resume.EditationEducation(
          resumeId,
          education.backendId,
          education.degree,
          education.institution,
          education.period
        );

        if (response?.success) {
          console.log("✅ Educação atualizada com sucesso!");
          addToast("Educação atulizada com sucesso!", "success");
        }
      } catch (err) {
        console.error("❌ Erro ao atualizar educação:", err);
        addToast("Erro ao atualizar educação.", "error");
      }
    }
  };

  const handleRemoveEducation = async (eduId) => {
    const education = resumeData.education.find(e => e.id === eduId);
    
    if (education?.backendId) {
      try {
        await resume.EducationRemoveProvide(resumeId, education.backendId);
        console.log("✅ Educação removida do backend");
        addToast("Habilidade removida.", "warning");
      } catch (error) {
        console.error("❌ Erro ao remover educação:", error);
        addToast("Erro ao remover educação.", "error");
      }
    }

    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== eduId),
    }));
  };

  // ============ SKILLS ============
  const HandleSkills = async (skillName) => {
    if (!skillName.trim()) {
      console.warn("⚠ Skill vazia");
      return;
    }

    try {
      console.log("📤 Criando skill:", skillName);
      const response = await resume.SkillsResumeProvide(skillName, resumeId);

      if (response?.data?._id) {
        console.log("✅ Skill criada com ID:", response.data._id);
        setResumeData((prev) => ({
          ...prev,
          skills: [...prev.skills, { 
            id: response.data._id,
            backendId: response.data._id, 
            skillName 
          }],
        }));
      }
    } catch (err) {
      console.error("❌ Erro ao criar skill:", err);
    }
  };

  const handleRemoveSkills = async (skillId) => {
    const skill = resumeData.skills.find(s => s.id === skillId);
    
    if (skill?.backendId) {
      try {
        await resume.SkillsRemoveProvide(resumeId, skill.backendId);
        console.log("✅ Skill removida do backend");
      } catch (error) {
        console.error("❌ Erro ao remover skill:", error);
      }
    }

    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== skillId),
    }));
  };

  // ============ LIMPAR DADOS PESSOAIS ============
  const handleRemovePersonal = async () => {
    if (!resumeData.personalInfo.id) {
      console.warn("⚠ Nenhum ID de dados pessoais encontrado!");
      addToast("Nenhum dado pessoal para remover.", "warning");
      return;
    }

    try {
      await resume.PersonalRemoveProvide(resumeId, resumeData.personalInfo.id);
      
      setResumeData((prev) => ({
        ...prev,
        personalInfo: {
          id: null,
          fullname: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          country: "",
          summary: "",
          website: "",
          github: "",
          linkedin: ""
        },
      }));

      console.log("✅ Dados pessoais removidos com sucesso!");
      addToast("Dados pessoais removidos com sucesso!", "warning");
    } catch (error) {
      console.error("❌ Erro ao remover dados pessoais:", error);
       addToast("Erro ao remover dados pessoais.", "error");
    }
  };

  const handleTabChange = (newTab) => {
    setTabValue(newTab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Editor de Currículo</h1>
          </div>
           <Button 
            className="cursor-pointer" 
            variant="hero" 
            size="lg"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            >
            <Download className="mr-2 h-5 w-5" />
            {isDownloading ? 'Gerando PDF...' : 'Baixar PDF'}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="w-full max-w-3xl mx-auto space-y-6">
              {/* Seletor de Template */}
              <Card className="p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <Label htmlFor="template-select" className="font-semibold">
                      Escolher Template:
                    </Label>
                  </div>
                  <select
                    id="template-select"
                    className="border rounded-md p-2 text-sm bg-white flex-1 max-w-[200px]"
                    value={selectedTemplateId}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                  >
                    <option value="">Preview Padrão</option>
                    {availableTemplates.map(template => (
                      <option key={template._id} value={template._id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                {isLoadingTemplate && (
                  <p className="text-sm text-muted-foreground mt-2">
                    ⚡ Atualizando preview...
                  </p>
                )}
              </Card>

              {/* Abas */}
              <div className="flex w-full justify-between bg-muted p-1 rounded-lg shadow-sm">
                <TabsTrigger value="personal" valueActive={tabValue} setValue={handleTabChange}>
                  <User className="h-4 w-4" />
                  Pessoal
                </TabsTrigger>
                <TabsTrigger value="experience" valueActive={tabValue} setValue={handleTabChange}>
                  <Briefcase className="h-4 w-4" />
                  Experiência
                </TabsTrigger>
                <TabsTrigger value="education" valueActive={tabValue} setValue={handleTabChange}>
                  <GraduationCap className="h-4 w-4" />
                  Educação
                </TabsTrigger>
                <TabsTrigger value="skills" valueActive={tabValue} setValue={handleTabChange}>
                  <Award className="h-4 w-4" />
                  Habilidades
                </TabsTrigger>
              </div>

              {/* PESSOAL */}
              {tabValue === "personal" && (
                <Card className="p-6 shadow-lg space-y-4">
                  <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullname">Nome Completo</Label>
                      <Input
                        id="fullname"
                        value={resumeData.personalInfo.fullname}
                        onChange={(e) => updatePersonalInfo("fullname", e.target.value)}
                        placeholder="João Silva"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                          placeholder="joao@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={resumeData.personalInfo.city}
                          onChange={(e) => updatePersonalInfo("city", e.target.value)}
                          placeholder="São Paulo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          value={resumeData.personalInfo.state}
                          onChange={(e) => updatePersonalInfo("state", e.target.value)}
                          placeholder="SP"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          value={resumeData.personalInfo.country}
                          onChange={(e) => updatePersonalInfo("country", e.target.value)}
                          placeholder="Brasil"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={resumeData.personalInfo.website}
                          onChange={(e) => updatePersonalInfo("website", e.target.value)}
                          placeholder="https://meusite.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          value={resumeData.personalInfo.github}
                          onChange={(e) => updatePersonalInfo("github", e.target.value)}
                          placeholder="https://github.com/seuusuario"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                          placeholder="https://linkedin.com/in/seuperfil"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="summary">Resumo Profissional</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                        placeholder="Descreva brevemente sua experiência e objetivos..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      onClick={HandlePersonalInfoEdit}
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600"
                    >
                      Salvar Alterações
                    </Button>
                    <Button
                      onClick={handleRemovePersonal}
                      className="bg-red-500 cursor-pointer hover:bg-red-600"
                    >
                      Limpar Dados
                    </Button>
                  </div>
                </Card>
              )}

              {/* EXPERIÊNCIA */}
              {tabValue === "experience" && (
                <Card className="p-6 shadow-lg space-y-4">
                  <h2 className="text-lg font-semibold">Experiência Profissional</h2>
                  <div className="space-y-4">
                    {resumeData.experiences.map((exp) => (
                      <div key={exp.id} className="space-y-3 rounded-lg border p-4">
                        <div>
                          <Label>Cargo</Label>
                          <Input
                            value={exp.jobDegree}
                            onChange={(e) => updateExperience(exp.id, "jobDegree", e.target.value)}
                            placeholder="Desenvolvedor Full Stack"
                          />
                        </div>
                        <div>
                          <Label>Empresa</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Empresa XYZ"
                          />
                        </div>
                        <div>
                          <Label>Período</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                            placeholder="Jan 2020 - Dez 2023"
                          />
                        </div>
                        <div>
                          <Label>Descrição</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Descreva suas responsabilidades..."
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => HandleExperienceSave(exp.id)}
                            className="bg-blue-500 cursor-pointer hover:bg-blue-600"
                            size="sm"
                          >
                            {exp.saved ? "Atualizar" : "Salvar"}
                          </Button>
                          <Button
                          className="cursor-pointer"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveExperience(exp.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addExperience} variant="outline" className="w-full">
                      + Adicionar Experiência
                    </Button>
                  </div>
                </Card>
              )}

              {/* EDUCAÇÃO */}
              {tabValue === "education" && (
                <Card className="p-6 shadow-lg space-y-4">
                  <h2 className="text-lg font-semibold">Educação</h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="space-y-3 rounded-lg border p-4">
                        <div>
                          <Label>Grau / Curso</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            placeholder="Bacharelado em Ciência da Computação"
                          />
                        </div>
                        <div>
                          <Label>Instituição</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder="Universidade XYZ"
                          />
                        </div>
                        <div>
                          <Label>Período</Label>
                          <Input
                            value={edu.period}
                            onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                            placeholder="2016 - 2020"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => HandleEducationSave(edu.id)}
                            className="bg-blue-500 cursor-pointer hover:bg-blue-600"
                            size="sm"
                          >
                            {edu.saved ? "Atualizar" : "Salvar"}
                          </Button>
                          <Button
                           className="cursor-pointer"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveEducation(edu.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addEducation} variant="outline" className="w-full cursor-pointer">
                      + Adicionar Educação
                    </Button>
                  </div>
                </Card>
              )}

              {/* SKILLS */}
              {tabValue === "skills" && (
                <Card className="p-6 shadow-lg space-y-4">
                  <h2 className="text-lg font-semibold">Habilidades</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.target.elements.skillInput;
                      HandleSkills(input.value);
                      input.value = "";
                    }}
                  >
                    <div className="flex gap-2">
                      <Input
                        name="skillInput"
                        placeholder="Digite uma habilidade..."
                      />
                      <Button
                        type="submit"
                        className="bg-[#4285F4] cursor-pointer hover:bg-[#357AE8]"
                      >
                        Adicionar
                      </Button>
                    </div>
                  </form>

                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2"
                      >
                        <span className="text-sm font-medium">{skill.skillName}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkills(skill.id)}
                          className="flex justify-center items-center border border-gray-800/45 bg-red-500/30 w-[20px] h-[20px] rounded-[20%] hover:bg-red-500/50 cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ResumePreview 
              data={resumeData} 
              templateHTML={templateHTML}
              isLoading={isLoadingTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}