import React from "react";
import { Card } from "./ui/card";

export function ResumePreview({ data, templateHTML, isLoading = false }) {
  const { personalInfo, experiences, education, skills } = data;

  if (isLoading) {
    return (
      <Card className="p-8 shadow-xl rounded-xl bg-white border border-gray-200 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando template...</p>
        </div>
      </Card>
    );
  }
  
 if (templateHTML) {
  const safeTemplateHTML = templateHTML.replace(
    /<\/head>/i,
    `<style>
      html, body {
        margin: 0;
        padding: 0;
        overflow-x: hidden !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      .cv, .container {
        max-width: 100% !important;
        overflow-x: hidden !important;
      }
    </style></head>`
  );

  return (
    <div className="w-full overflow-x-hidden">
      <Card className="p-4 shadow-xl rounded-xl bg-white border border-gray-200 overflow-hidden">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Preview do Template
        </h3>

        <div className="rounded-lg overflow-hidden w-full">
          <div className="relative w-full h-[800px] overflow-hidden">
            <iframe
              title="resume-preview"
              srcDoc={safeTemplateHTML}
              className="absolute top-0 left-0 w-full h-full border-0"
              sandbox="allow-same-origin"
              loading="lazy"
              style={{
                overflow: "hidden",
                width: "100%",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}



  return (
    <Card className="p-10 shadow-xl rounded-xl bg-white border border-gray-200">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {personalInfo.fullname || "Seu Nome"}
        </h2>
        <div className="w-24 h-[2px] bg-primary mx-auto mt-2 mb-4"></div>

        {(personalInfo.email || personalInfo.phone || personalInfo.city || personalInfo.state || personalInfo.country) && (
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.city && <p>{personalInfo.city}</p>}
            {personalInfo.state && <p>{personalInfo.state}</p>}
            {personalInfo.country && <p>{personalInfo.country}</p>}
          </div>
        )}
      </div>

      {/* Resumo Profissional */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-2">Resumo Profissional</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experiências */}
      {experiences?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Experiência Profissional</h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <h4 className="font-medium text-gray-800">{exp.jobDegree || "Cargo"}</h4>
                <p className="text-sm text-gray-600 italic">
                  {exp.company || "Empresa"} — {exp.period || "Período"}
                </p>
                {exp.description && (
                  <p className="text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Educação */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-primary mb-3">Formação Acadêmica</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <h4 className="font-medium text-gray-800">{edu.degree || "Curso"}</h4>
                <p className="text-sm text-gray-600 italic">
                  {edu.institution || "Instituição"} — {edu.period || "Período"} — {edu.description || "Descrição"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Habilidades */}
      {skills?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-primary mb-3">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={skill.id || i}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {typeof skill === "string" ? skill : skill.skillName}
              </span>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
}
