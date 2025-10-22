import React from "react";
import { Card } from "./ui/card";

export function ResumePreview({ data }) {
  const { personalInfo, experiences, education, skills } = data;

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
                <h4 className="font-medium text-gray-800">{exp.title || "Cargo"}</h4>
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
                key={i}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </Card>
  );
}
