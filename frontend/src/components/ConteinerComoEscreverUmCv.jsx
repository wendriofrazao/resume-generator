"use client";

import React from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { FileText, ArrowLeft, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

export function ConteinerComoEscreverUmCv() {
  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0F172A]">
      {/* Header */}
      <header className="border-b bg-white/60 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#2563EB]" />
            <span className="font-bold text-xl text-[#0F172A]">Gerador de Currículos</span>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="border-[#2563EB]/30 text-[#2563EB] hover:bg-[#2563EB]/10 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#F0F4FA] via-[#E8EDFA] to-[#EEF1FD]">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-4 py-2 text-sm font-medium text-[#2563EB] mb-6">
            <Lightbulb className="h-4 w-4" />
            Guia Completo
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F172A]">
            Como Escrever um CV Profissional
          </h1>
          <p className="text-lg text-[#64748B]">
            Um guia passo a passo para criar um currículo que impressiona recrutadores
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          {/* Estrutura Essencial */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#0F172A]">Estrutura Essencial de um CV</h2>
            <Card className="p-8 bg-white shadow-md rounded-2xl border border-[#E2E8F0]">
              <div className="space-y-8 text-[#64748B]">
                {/* 1 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0F172A]">
                    <CheckCircle className="h-5 w-5 text-[#2563EB]" />
                    1. Informações de Contato
                  </h3>
                  <p>Comece com seus dados essenciais de forma clara e acessível:</p>
                  <ul className="mt-2 ml-7 list-disc space-y-1">
                    <li>Nome completo</li>
                    <li>Email profissional</li>
                    <li>Telefone com DDD</li>
                    <li>LinkedIn (opcional, mas recomendado)</li>
                    <li>Cidade e estado</li>
                  </ul>
                </div>

                {/* 2 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0F172A]">
                    <CheckCircle className="h-5 w-5 text-[#2563EB]" />
                    2. Resumo Profissional
                  </h3>
                  <p>Um parágrafo breve (3-4 linhas) destacando:</p>
                  <ul className="mt-2 ml-7 list-disc space-y-1">
                    <li>Sua principal qualificação profissional</li>
                    <li>Anos de experiência relevantes</li>
                    <li>Principais competências</li>
                    <li>Objetivo de carreira (quando relevante)</li>
                  </ul>
                </div>

                {/* 3 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0F172A]">
                    <CheckCircle className="h-5 w-5 text-[#2563EB]" />
                    3. Experiência Profissional
                  </h3>
                  <p>Liste suas experiências em ordem cronológica reversa:</p>
                  <ul className="mt-2 ml-7 list-disc space-y-1">
                    <li>Título do cargo</li>
                    <li>Nome da empresa</li>
                    <li>Período (mês/ano - mês/ano ou “Presente”)</li>
                    <li>3-5 bullet points com conquistas mensuráveis</li>
                    <li>Use verbos de ação como “Desenvolvi”, “Gerenciei”, “Implementei”</li>
                  </ul>
                </div>

                {/* 4 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0F172A]">
                    <CheckCircle className="h-5 w-5 text-[#2563EB]" />
                    4. Formação Acadêmica
                  </h3>
                  <p>Inclua suas qualificações educacionais:</p>
                  <ul className="mt-2 ml-7 list-disc space-y-1">
                    <li>Nome do curso/diploma</li>
                    <li>Instituição de ensino</li>
                    <li>Ano de conclusão (ou previsão)</li>
                    <li>Honras ou distinções (se aplicável)</li>
                  </ul>
                </div>

                {/* 5 */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0F172A]">
                    <CheckCircle className="h-5 w-5 text-[#2563EB]" />
                    5. Habilidades
                  </h3>
                  <p>Liste suas competências relevantes:</p>
                  <ul className="mt-2 ml-7 list-disc space-y-1">
                    <li>Habilidades técnicas específicas da área</li>
                    <li>Ferramentas e softwares que domina</li>
                    <li>Idiomas e nível de fluência</li>
                    <li>Soft skills relevantes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border border-[#DBEAFE] shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#2563EB]">
                <CheckCircle className="h-5 w-5" />
                O que FAZER
              </h3>
              <ul className="space-y-3 text-[#64748B]">
                {[
                  "Use verbos de ação e métricas concretas",
                  "Personalize para cada vaga",
                  "Revise ortografia e gramática",
                  "Use formatação consistente",
                  "Mantenha entre 1-2 páginas",
                  "Destaque conquistas, não apenas responsabilidades",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#2563EB] mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-white border border-[#FEE2E2] shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#DC2626]">
                <AlertCircle className="h-5 w-5" />
                O que NÃO FAZER
              </h3>
              <ul className="space-y-3 text-[#64748B]">
                {[
                  "Incluir informações pessoais desnecessárias",
                  "Usar fotos (a menos que seja solicitado)",
                  "Mentir ou exagerar habilidades",
                  "Usar email não profissional",
                  "Incluir salários anteriores",
                  "Usar linguagem muito informal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#DC2626] mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Tips */}
          <Card className="p-8 bg-[#EEF2FF] border border-[#E0E7FF] shadow-sm rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#0F172A]">
              <Lightbulb className="h-6 w-6 text-[#2563EB]" />
              Dicas Extras para se Destacar
            </h2>
            <div className="space-y-4 text-[#64748B]">
              <p>
                <strong className="text-[#0F172A]">Quantifique suas conquistas:</strong> Em vez de “Melhorei as vendas”, escreva “Aumentei as vendas em 35% em 6 meses”.
              </p>
              <p>
                <strong className="text-[#0F172A]">Use palavras-chave:</strong> Analise a descrição da vaga e inclua termos relevantes naturalmente.
              </p>
              <p>
                <strong className="text-[#0F172A]">Seja específico:</strong> Detalhes concretos causam mais impacto que descrições genéricas.
              </p>
              <p>
                <strong className="text-[#0F172A]">Atualize regularmente:</strong> Revise seu CV a cada 3–6 meses.
              </p>
            </div>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] p-10 text-center rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-white mb-4">Pronto para criar seu CV profissional?</h2>
            <p className="text-white/90 mb-6">Use nossa plataforma para criar um currículo impressionante em minutos</p>
            <Link to="/auth">
              <Button className="cursor-pointer hover:bg-gray-200 " variant="secondary" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
