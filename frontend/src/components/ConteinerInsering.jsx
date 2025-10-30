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

export function InseringDatasResume() {
  const [tabValue, setTabValue] = useState("personal");
  // const [personalSent, setPersonalSent] = useState(false); 
  // const [experienceSent, setExperienceSent] = useState(false); 
  // const [educationSent, setEducationSent] = useState(false); 
  const [newSkill, setNewSkill] = useState("");
  // const [skillsSent, setSkillsSent] = useState(false); 

  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [templateHTML, setTemplateHTML] = useState("");
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);


  const resume = new ResumeProvide();
  const { resumeId } = useParams();

  // personal
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [summary, setSummary] = useState("");

  const [personalDetailId, setPersonalDetailId] = useState(null);

  // experiencia
  const [jobDegree, setJobDegree] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");

  const [experienceId, setExperienceId] = useState(null);


  // educação
  const [degreeEdu, setDegreeEdu] = useState("");
  const [institutionEdu, setinstitutionEdu] = useState("");
  const [periodEdu, setPeriodEdu] = useState("");

  const [educationId, setEducationId] = useState(null);


  // habilidade
  const [skillName, setSkillName] = useState("");

  const [skillId, setSkillId] = useState(null);

  // atualizar os dados no card apresentativo
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullname: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      summary: "",
    },
    experiences: [],
    education: [],
    skills: [],
  });



// handles

useEffect(() => {
  loadAvailableTemplates();
}, []);

const loadAvailableTemplates = async () => {
  try {
    
    const response = await resume.getAvailableTemplates();
    
    
    if (response.ok) {
      setAvailableTemplates(response.data);
      
    } else {
    }
  } catch (error) {
  }
};


  const loadTemplatePreview = async () => {
  if (!selectedTemplateId) return;
  
  setIsLoadingTemplate(true);
  try {
    
    const templateResponse = await resume.getTemplatePreview(selectedTemplateId);
    
    if (!templateResponse.ok) {
      return;
    }

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
  } finally {
    setIsLoadingTemplate(false);
  }
};

const prepareTemplateData = (resumeData) => {
  return {
    fullName: resumeData.personalInfo?.fullname || "Seu Nome",
    cityCountry: `${resumeData.personalInfo?.city || ""}, ${resumeData.personalInfo?.country || ""}`,
    citizenship: resumeData.personalInfo?.country || "Brasil",
    phone: resumeData.personalInfo?.phone || "(11) 99999-9999",
    email: resumeData.personalInfo?.email || "seu@email.com",
    website: resumeData.personalInfo?.website || "#",
    github: resumeData.personalInfo?.github || "#",
    linkedin: resumeData.personalInfo?.linkedin || "#",
    
    experiences: resumeData.experiences?.map(exp => ({
      jobTitle: exp.title || exp.jobDegree || "Cargo",
      company: exp.company || "Empresa",
      location: exp.location || "Localização",
      startMonth: exp.period?.split(' - ')[0] || "Data Início",
      endMonth: exp.period?.split(' - ')[1] || "Data Fim",
      responsibilities: exp.description ? [{ text: exp.description }] : []
    })) || [],
    
    education: resumeData.education?.map(edu => ({
      degree: edu.degree || "Curso",
      university: edu.institution || "Instituição",
      location: edu.location || "Localização",
      startMonth: edu.period?.split(' - ')[0] || "Data Início",
      endMonth: edu.period?.split(' - ')[1] || "Data Fim"
    })) || [],
    
    skills: resumeData.skills?.map(skill => ({
      name: typeof skill === 'string' ? skill : skill.skillName,
      level: "Avançado"
    })) || [],
    
    // Projetos (se necessário)
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

  // dados pessoais
  const HandlePersonalInfo = async () => {
    // if (personalSent) {
    //   console.log(" Dados pessoais já foram enviados, não será reenviado.");
    //   return;
    // }

    if (!fullname || !email || !phone || !city || !state || !country || !summary) {
      console.warn(" Campos obrigatórios faltando.");
      return;
    }

    try {
      console.log(" Enviando dados pessoais para o backend...");
      const response = await resume.PersonalResumeProvide(
        fullname,
        email,
        phone,
        city,
        state,
        country,
        summary,
        resumeId
      );

      if (response?.data?._id) {
        console.log(" ID dos dados pessoais salvo:", response.data._id);
      }

  
      if (response?.ok || response?.success) {
        console.log(" Dados pessoais enviados com sucesso!");
        // setPersonalSent(true);
      } else {
        console.error(" Erro ao enviar dados pessoais:", response);
      }
    } catch (err) {
      console.error(" Erro inesperado ao enviar dados pessoais:", err);
    }
  };


  // experiencia
  const HandleExperienceWork = async () => {
    // if (experienceSent) {
    //   console.log(" Dados pessoais já foram enviados, não será reenviado.");
    //   return;
    // }

    if (!jobDegree || !company || !description || !period) {
      console.warn(" Campos obrigatórios faltando.");
      return;
    }

    try {
      console.log(" Enviando dados pessoais para o backend...");
      const response = await resume.ExperienceResumeProvide(
        jobDegree,
        company,
        description,
        period,
        resumeId
      );

      if (response?.data?._id) {
        console.log(" ID dos dados pessoais salvo:", response.data._id);
      }

      if (response?.ok || response?.success) {
        console.log(" Dados pessoais enviados com sucesso!");
        // setExperienceSent(true);
      } else {
        console.error(" Erro ao enviar dados pessoais:", response);
      }
    } catch (err) {
      console.error(" Erro inesperado ao enviar dados pessoais:", err);
    }
  };

  // educação
  const HandleEducation = async () => {
    // if (educationSent) {
    //   console.log(" Dados pessoais já foram enviados, não será reenviado.");
    //   return;
    // }

    if (!degreeEdu || !institutionEdu || !periodEdu) {
      console.warn(" Campos obrigatórios faltando.");
      return;
    }

    try {
      console.log(" Enviando dados pessoais para o backend...");
      const response = await resume.EducationResumeProvide(
        degreeEdu,
        institutionEdu,
        periodEdu,
        resumeId
      );

      if (response?.data?._id) {
        setEducationId(response.data._id);
        console.log(" ID dos dados pessoais salvo:", response.data._id);
      }

      if (response?.ok || response?.success) {
        console.log(" Dados pessoais enviados com sucesso!");
      } else {
        console.error(" Erro ao enviar dados pessoais:", response);
      }
    } catch (err) {
      console.error(" Erro inesperado ao enviar dados pessoais:", err);
    }
  };

  // habilidades
    const HandleSkills = async () => {
    if (!skillName.trim()) {
      console.warn("Campos obrigatórios faltando.");
      return;
    }

    try {
      console.log("Enviando skill para o backend...");
      const response = await resume.SkillsResumeProvide(skillName, resumeId);

      if (response?.data?._id) {
        console.log("Skill salva com ID:", response.data._id);

        setResumeData((prev) => ({
          ...prev,
          skills: [...prev.skills, { id: response.data._id, skillName }],
        }));
      }

      setSkillName(""); 
    } catch (err) {
      console.error("Erro inesperado ao enviar skill:", err);
    }
  };


  const handleTabChange = (newTab) => {
    
    if (tabValue === "personal" && newTab !== "personal") {
      HandlePersonalInfo(); 
    }

    if (tabValue === "experience" && newTab !== "experience") {
      HandleExperienceWork();
    }

    if (tabValue === "education" && newTab !== "education") {
      HandleEducation();
    }

    setTabValue(newTab);
  };


  // --------------- remoção -------------------

  const handleRemovePersonal = async () => {
  if (!personalDetailId) {
    console.warn(" Nenhum ID de dados pessoais encontrado!");
    return;
  }

  try {
    await resume.PersonalRemoveProvide(resumeId, personalDetailId);

    setFullname("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
    setCountry("");
    setSummary("");

    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        fullname: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        summary: "",
      },
    }));

    console.log(" Dados pessoais removidos com sucesso!");
  } catch (error) {
    console.error(" Erro ao remover dados pessoais:", error);
  }
};

// remove a aba de experiencias
  const handleRemoveExperienceWork = async () => {
  if (!experienceId) {
    console.warn(" Nenhum ID de dados pessoais encontrado!");
    return;
  }

  try {
    await resume.ExperienceRemoveProvide(resumeId, experienceId);

    setJobDegree("");
    setCompany("");
    setPeriod("");
    setDescription("");

    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== experienceId)
    }));

    console.log(" Dados de experiências removidos com sucesso!");
  } catch (error) {
    console.error(" Erro ao remover dados pessoais:", error);
  }
};

// remoção da aba de educação
  const handleRemoveEducation = async () => {
  if (!educationId) {
    console.warn(" Nenhum ID de dados pessoais encontrado!");
    return;
  }

  try {
    await resume.EducationRemoveProvide(resumeId, educationId);

    setDegreeEdu("");
    setinstitutionEdu("");
    setPeriodEdu("");

    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== educationId)
    }));

    console.log(" Dados educacionais removidos com sucesso!");
  } catch (error) {
    console.error(" Erro ao remover dados pessoais:", error);
  }
};

  // remoção na aba de habilidades
  const handleRemoveSkills = async (skillId) => {
  if (!skillId) {
    console.warn("Nenhum ID de skill encontrado!");
    return;
  }

  try {
    await resume.SkillsRemoveProvide(resumeId, skillId);

    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== skillId),
    }));

    console.log("Skill removida com sucesso!");
  } catch (error) {
    console.error("Erro ao remover skill:", error);
  }
};


  // Funções das outras seções/preview
  const updatePersonalInfo = (campo, valor) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [campo]: valor,
      },
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: Date.now(), title: "", company: "", period: "", description: "" },
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

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), degree: "", institution: "", period: "" },
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

  const removeEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill("");
  };

  const removeSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Crie seu Currículo</h1>
          </div>
          <Button className="cursor-pointer" variant="hero" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Baixar PDF
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Insering Form */}
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
      onChange={(e) => {
        setSelectedTemplateId(e.target.value);
      }}
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

              {/* Cabeçalho das abas */}
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

              {/* Conteúdo das abas */}
              {tabValue === "personal" && (
                <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                  <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullname">Nome Completo</Label>
                      <Input
                        id="fullname"
                        value={fullname}
                        onChange={(e) => {
                          setFullname(e.target.value);
                          updatePersonalInfo("fullname", e.target.value);
                        }}
                        placeholder="João Silva"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          updatePersonalInfo("email", e.target.value);
                        }}
                        placeholder="joao@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          updatePersonalInfo("phone", e.target.value);
                        }}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          updatePersonalInfo("city", e.target.value);
                        }}
                        placeholder="São Paulo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          updatePersonalInfo("state", e.target.value);
                        }}
                        placeholder="SP"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">País</Label>
                      <Input
                        id="country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          updatePersonalInfo("country", e.target.value);
                        }}
                        placeholder="Brasil"
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary">Resumo Profissional</Label>
                      <Textarea
                        id="summary"
                        value={summary}
                        onChange={(e) => {
                          setSummary(e.target.value);
                          updatePersonalInfo("summary", e.target.value);
                        }}
                        placeholder="Descreva brevemente sua experiência e objetivos..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleRemovePersonal}
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow-sm transition"
                    >
                      Limpar Dados
                    </Button>
                  </div>
                </Card>
              )}

              {/* Experiência */}
              {tabValue === "experience" && (
                <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                  <h2 className="text-lg font-semibold">Experiência Profissional</h2>
                  <div className="space-y-4">
                    {resumeData.experiences.map((exp) => (
                      <div key={exp.id} className="space-y-3 rounded-lg border p-4">
                        <div>
                          <Label htmlFor="jobDegree">Cargo</Label>
                          <Input
                            id="jobDegree"
                            value={jobDegree}
                            onChange={(e) => {
                              setJobDegree(e.target.value)
                              updateExperience(exp.id ,"title", e.target.value)
                            }}
                            placeholder="Desenvolvedor Full Stack"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Empresa</Label>
                          <Input
                            id="company"
                            value={company}
                            onChange={(e) => {
                              setCompany(e.target.value);
                              updateExperience(exp.id, "company", e.target.value);
                            }}
                            placeholder="Empresa XYZ"
                          />
                        </div>
                        <div>
                          <Label htmlFor="period">Período</Label>
                          <Input
                            id="period"
                            value={period}
                            onChange={(e) => {
                              setPeriod(e.target.value)
                              updateExperience(exp.id, "period", e.target.value)
                            }}
                            placeholder="Jan 2020 - Dez 2023"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                              updateExperience(exp.id, "description", e.target.value);
                            }}
                            placeholder="Descreva suas responsabilidades..."
                            rows={3}
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            handleRemoveExperienceWork();
                            removeExperience(exp.id)
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addExperience} variant="outline" className="w-full">
                      + Adicionar Experiência
                    </Button>
                  </div>
                </Card>
              )}

              {/* Educação */}
              {tabValue === "education" && (
                <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                  <h2 className="text-lg font-semibold">Educação</h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="space-y-3 rounded-lg border p-4">
                        <div>
                          <Label htmlFor="degree">Grau / Curso</Label>
                          <Input
                            id="degree"
                            value={degreeEdu}
                            onChange={(e) => {
                              setDegreeEdu(e.target.value);
                              updateEducation(edu.id, "degree", e.target.value)
                            }}
                            placeholder="Bacharelado em Ciência da Computação"
                          />
                        </div>
                        <div>
                          <Label htmlFor="institution">Instituição</Label>
                          <Input
                            id="institution"
                            value={institutionEdu}
                            onChange={(e) => {
                              setinstitutionEdu(e.target.value);
                              updateEducation(edu.id, "institution", e.target.value);
                            }}
                            placeholder="Universidade XYZ"
                          />
                        </div>
                        <div>
                          <Label htmlFor="period">Período</Label>
                          <Input
                            id="period"
                            value={periodEdu}
                            onChange={(e) => {
                              setPeriodEdu(e.target.value);
                              updateEducation(edu.id, "period", e.target.value)
                            }}
                            placeholder="2016 - 2020"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            handleRemoveEducation(skillId);
                            removeEducation(edu.id);
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                    <Button onClick={addEducation} variant="outline" className="w-full">
                      + Adicionar Educação
                    </Button>
                  </div>
                </Card>
              )}

              {/* Habilidades */}
              {tabValue === "skills" && (
               <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await HandleSkills();
                  }}
                >
                  <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                    <h2 className="text-lg font-semibold">Habilidades</h2>

                    {/* Campo de input e botão */}
                    <div className="flex gap-2">
                      <Input
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        placeholder="Digite uma habilidade..."
                      />
                      <Button
                        type="submit"
                        className="bg-[#4285F4] text-white font-medium px-4 py-2 rounded-md shadow-sm hover:bg-[#357AE8] transition cursor-pointer"
                      >
                        Adicionar
                      </Button>
                    </div>

                    {/* Lista de skills adicionadas */}
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
                            className="flex justify-center items-center border border-gray-800/45 bg-red-500/30 w-[20px] h-[20px] rounded-[20%] text-muted-foreground hover:text-destructive cursor-pointer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </form>
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
