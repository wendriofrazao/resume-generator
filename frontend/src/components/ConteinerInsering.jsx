"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { TabsTrigger } from "./ui/tabs";
import { FileText, User, Briefcase, GraduationCap, Award, Download } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { useParams } from "react-router-dom";
import { ResumeProvide } from "../hooks/resumeHook";

export function InseringDatasResume() {
  const [tabValue, setTabValue] = useState("personal");
  const [personalSent, setPersonalSent] = useState(false); 
  const [experienceSent, setExperienceSent] = useState(false); 

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

  // experiencia
  const [jobDegree, setJobDegree] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");


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

  const [newSkill, setNewSkill] = useState("");

  // dados pessoais
  const HandlePersonalInfo = async () => {
    if (personalSent) {
      console.log("⚠️ Dados pessoais já foram enviados, não será reenviado.");
      return;
    }

    if (!fullname || !email || !phone || !city || !state || !country || !summary) {
      console.warn("❌ Campos obrigatórios faltando.");
      return;
    }

    try {
      console.log("📤 Enviando dados pessoais para o backend...");
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

      if (response?.ok || response?.success) {
        console.log("✅ Dados pessoais enviados com sucesso!");
        setPersonalSent(true);
      } else {
        console.error("❌ Erro ao enviar dados pessoais:", response);
      }
    } catch (err) {
      console.error("❌ Erro inesperado ao enviar dados pessoais:", err);
    }
  };


  // experiencia
  const HandleExperienceWork = async () => {
    if (experienceSent) {
      console.log("⚠️ Dados pessoais já foram enviados, não será reenviado.");
      return;
    }

    if (!jobDegree || !company || !description || !period) {
      console.warn("❌ Campos obrigatórios faltando.");
      return;
    }

    try {
      console.log("📤 Enviando dados pessoais para o backend...");
      const response = await resume.ExperienceResumeProvide(
        jobDegree,
        company,
        description,
        period,
        resumeId
      );

      if (response?.ok || response?.success) {
        console.log("✅ Dados pessoais enviados com sucesso!");
        setExperienceSent(true);
      } else {
        console.error("❌ Erro ao enviar dados pessoais:", response);
      }
    } catch (err) {
      console.error("❌ Erro inesperado ao enviar dados pessoais:", err);
    }
  };


  const handleTabChange = (newTab) => {
    
    if (tabValue === "personal" && newTab !== "personal") {
      HandlePersonalInfo(); 
    }

    if (tabValue === "experience" && newTab !== "experience") {
      HandleExperienceWork();
    }
    setTabValue(newTab);
  };


  // Atualiza os dados pessoais no estado geral
  const updatePersonalInfo = (campo, valor) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [campo]: valor,
      },
    }));
  };

  // Funções das outras seções
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
            <h1 className="text-3xl font-bold">Editor de Currículo</h1>
          </div>
          <Button variant="hero" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Baixar PDF
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Insering Form */}
          <div className="space-y-6">
            <div className="w-full max-w-3xl mx-auto space-y-6">
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
                          onClick={() => removeExperience(exp.id)}
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
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
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
                <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                  <h2 className="text-lg font-semibold">Habilidades</h2>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      placeholder="Digite uma habilidade..."
                    />
                    <Button onClick={addSkill}>Adicionar</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2"
                      >
                        <span className="text-sm font-medium">{skill}</span>
                        <button
                          onClick={() => removeSkill(index)}
                          className="text-muted-foreground hover:text-destructive"
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
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
