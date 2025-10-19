"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FileText, User, Briefcase, GraduationCap, Award, Download } from "lucide-react";
import { ResumePreview } from "./ResumePreview"; 

import { ResumeProvide } from "../hooks/resumeHook";

export function InseringDatasResume() {
  const [tabValue, setTabValue] = useState("personal");

  const resume = new ResumeProvide();

  // personal
  const [ fullname, setFullname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ city, setCity ] = useState("");
  const [ state, setState ] = useState("");
  const [ country, setCountry ] = useState("");
  const [ summary, setSummary ] = useState("");
  
  const [resumeData, setResumeData] = useState({

    experiences: [],
    education: [],
    skills: [],
  });

  const [newSkill, setNewSkill] = useState("");

const HandlePersonalInfo = async (event) => {
  event.preventDefault();

  const resumeId = localStorage.getItem("resumeId");

  if (!resumeId) {
    console.error("Nenhum resumeId encontrado. Crie o currículo primeiro!");
    return;
  }

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

  console.log("Resposta do backend:", response);
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
            <Tabs defaultValue="personal" className="w-full space-y-6">
              
              <div className="w-full max-w-3xl mx-auto space-y-6">
                    {/* Cabeçalho das abas */}
                    <div className="flex w-full justify-between bg-muted p-1 rounded-lg shadow-sm">
                      <TabsTrigger value="personal" valueActive={tabValue} setValue={setTabValue}>
                        <User className="h-4 w-4" />
                        Pessoal
                      </TabsTrigger>

                      <TabsTrigger value="experience" valueActive={tabValue} setValue={setTabValue}>
                        <Briefcase className="h-4 w-4" />
                        Experiência
                      </TabsTrigger>

                      <TabsTrigger value="education" valueActive={tabValue} setValue={setTabValue}>
                        <GraduationCap className="h-4 w-4" />
                        Educação
                      </TabsTrigger>

                      <TabsTrigger value="skills" valueActive={tabValue} setValue={setTabValue}>
                        <Award className="h-4 w-4" />
                        Habilidades
                      </TabsTrigger>
                    </div>

                    {/* Conteúdo das abas */}
                    {tabValue === "personal" && (
                      <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                        <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                        <p>Adicione aqui suas informações pessoais.</p>
                      </Card>
                    )}

                    { tabValue === "personal" && (

                      <form method="post" onSubmit={HandlePersonalInfo}>

                        <TabsContent value="personal" className="mt-4">
                          <Card className="p-6 shadow-lg space-y-4">
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="fullname">Nome Completo</Label>
                                <Input
                                  id="fullname"
                                  name="fullname"
                                  value={fullname}
                                  onChange={(e) => setFullname(e.target.value)}
                                  placeholder="João Silva"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="joao@email.com"
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Telefone</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="(11) 99999-9999"
                                />
                              </div>
                              <div>
                                <Label htmlFor="city">Cidade</Label>
                                <Input
                                  id="city"
                                  name="city"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  placeholder="São Paulo"
                                />
                              </div>
                              <div>
                                <Label htmlFor="state">Estado</Label>
                                <Input
                                  id="state"
                                  name="state"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                  placeholder="SP"
                                  />
                              </div>
                              <div>
                                <Label htmlFor="country">País</Label>
                                <Input
                                  id="country"
                                  name="country"
                                  value={country}
                                  onChange={(e) => setCountry(e.target.value)}
                                  placeholder="Brasil"
                                  />
                              </div>
                              <div>
                                <Label htmlFor="summary">Resumo Profissional</Label>
                                <Textarea
                                  id="summary"
                                  name="summary"
                                  value={summary}
                                  onChange={(e) => setSummary(e.target.value)}
                                  placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
                                  rows={4}
                                  />
                              </div>
                            </div>
                          </Card>
                        </TabsContent>
                      <button type="submit">enviar</button>
                      </form>
                    ) }

                    {tabValue === "experience" && (
                      <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                        <h2 className="text-lg font-semibold">Experiência Profissional</h2>
                        <p>Liste suas experiências de trabalho anteriores.</p>
                      </Card>
                    )}

                    { tabValue === "experience" && (
                        <TabsContent value="experience" className="mt-4">
                          <Card className="p-6 shadow-lg space-y-4">
                            <div className="space-y-4">
                              {resumeData.experiences.map((exp) => (
                                <div key={exp.id} className="space-y-3 rounded-lg border p-4">
                                  <div>
                                    <Label>Cargo</Label>
                                    <Input
                                      value={exp.title}
                                      fullName="jobDegree"
                                      onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                      placeholder="Desenvolvedor Full Stack"
                                    />
                                  </div>
                                  <div>
                                    <Label>Empresa</Label>
                                    <Input
                                      value={exp.company}
                                      fullName="company"
                                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                      placeholder="Empresa XYZ"
                                    />
                                  </div>
                                  <div>
                                    <Label>Período</Label>
                                    <Input
                                      value={exp.period}
                                      fullName="period"
                                      onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                                      placeholder="Jan 2020 - Dez 2023"
                                    />
                                  </div>
                                  <div>
                                    <Label>Descrição</Label>
                                    <Textarea
                                      value={exp.description}
                                      fullName="description"
                                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                      placeholder="Descreva suas responsabilidades e conquistas..."
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
                        </TabsContent>
                    ) }

                    {tabValue === "education" && (
                      <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                        <h2 className="text-lg font-semibold">Educação</h2>
                        <p>Adicione seus cursos e formações acadêmicas.</p>
                      </Card>
                    )}

                    { tabValue === "education" && (

                          <TabsContent value="education" className="mt-4">
                            <Card className="p-6 shadow-lg space-y-4">
                              <div className="space-y-4">
                                {resumeData.education.map((edu) => (
                                  <div key={edu.id} className="space-y-3 rounded-lg border p-4">
                                    <div>
                                      <Label>Grau / Curso</Label>
                                      <Input
                                        value={edu.degree}
                                        fullName="degree"
                                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                        placeholder="Bacharelado em Ciência da Computação"
                                      />
                                    </div>
                                    <div>
                                      <Label>Instituição</Label>
                                      <Input
                                        value={edu.institution}
                                        fullName="institution"
                                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                        placeholder="Universidade Anhanguera"
                                      />
                                    </div>
                                    <div>
                                      <Label>Período</Label>
                                      <Input
                                        value={edu.period}
                                        fullName="period"
                                        onChange={(e) => updateEducation(edu.id, "period", e.target.value)}
                                        placeholder="2016 - 2020"
                                      />
                                    </div>
                                    <div>
                                      <Label>Descrição</Label>
                                      <Input
                                        value={edu.description}
                                        fullName="description"
                                        onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                                        placeholder="Descreva como seu curso"
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
                          </TabsContent>

                    ) }

                    {tabValue === "skills" && (
                      <Card className="p-6 shadow-lg space-y-4 animate-fadeIn">
                        <h2 className="text-lg font-semibold">Habilidades</h2>
                        <p>Liste suas principais habilidades técnicas e interpessoais.</p>
                      </Card>
                    )}

                      { tabValue === "skills" && (

                          <TabsContent value="skills" className="mt-4">
                            <Card className="p-6 shadow-lg space-y-4">
                              <div className="space-y-4">
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
                              </div>
                            </Card>
                          </TabsContent>

                      ) }

                  </div>

            </Tabs>
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