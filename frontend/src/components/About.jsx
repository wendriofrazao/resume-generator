"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Users, Heart, Zap, Shield, TrendingUp } from "lucide-react";

export function AboutInfo() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#0f172a]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-500 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Gerador de Currículos
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-[#f9fafb] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#0f172a]">
            Sobre Nós
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
            Somos uma plataforma dedicada a ajudar profissionais a criarem currículos
            impressionantes e conquistarem as oportunidades que merecem.
          </p>
        </div>
      </section>

      {/* Missão Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2 items-start">
          {/* Esquerda */}
          <div>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#0f172a]">Nossa Missão</h2>
            <p className="mb-6 text-lg text-gray-600 leading-relaxed">
              Democratizar o acesso a ferramentas profissionais de criação de currículos,
              permitindo que qualquer pessoa, independente de sua experiência técnica ou
              recursos financeiros, possa criar um currículo de alta qualidade.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Acreditamos que todos merecem ter a chance de apresentar suas habilidades e
              experiências da melhor forma possível. Por isso, oferecemos uma plataforma
              100% gratuita, intuitiva e profissional.
            </p>
          </div>

          {/* Direita */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-8">
            <h3 className="text-2xl font-semibold mb-6">Por que existimos?</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                "Sabemos que a busca por emprego pode ser desafiadora e estressante.",
                "Um currículo bem feito é o primeiro passo para causar uma boa impressão.",
                "Muitas pessoas não têm acesso a designers ou ferramentas caras.",
                "Queremos nivelar o campo de jogo e dar a todos uma chance justa.",
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="bg-[#f9fafb] py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#0f172a]">Nossos Valores</h2>
          <p className="text-lg text-gray-600 mb-16">
            Os princípios que guiam nosso trabalho todos os dias
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Simplicidade", text: "Acreditamos que criar um currículo profissional não deve ser complicado. Nossa interface é intuitiva e fácil de usar." },
              { icon: Heart, title: "Acessibilidade", text: "Nossa plataforma é 100% gratuita. Não cobramos taxas ocultas nem limitamos funcionalidades essenciais." },
              { icon: Shield, title: "Privacidade", text: "Seus dados são seus. Levamos a privacidade a sério e nunca compartilhamos suas informações pessoais." },
              { icon: TrendingUp, title: "Qualidade", text: "Nossos templates são criados por profissionais e seguem as melhores práticas do mercado de trabalho." },
              { icon: Users, title: "Inclusão", text: "Acreditamos que oportunidades de carreira devem estar disponíveis para todos, independente de origem ou situação." },
              { icon: Target, title: "Foco no Resultado", text: "Nosso sucesso é medido pelo sucesso de nossos usuários em conquistar as oportunidades que desejam." },
            ].map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-8 text-left shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="mb-8 text-4xl font-bold text-[#0f172a]">Nossa História</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-left">
            <p>
              O Gerador de Currículos nasceu de uma necessidade real observada no mercado
              de trabalho brasileiro. Percebemos que muitos profissionais talentosos tinham
              dificuldade em apresentar suas habilidades de forma profissional e atraente.
            </p>
            <p>
              Ferramentas de design profissionais são caras e complexas. Serviços de design
              personalizado estão fora do alcance da maioria das pessoas. E currículos
              genéricos criados em editores simples não causam a impressão necessária em
              recrutadores.
            </p>
            <p>
              Então decidimos criar uma solução: uma plataforma que combina design
              profissional, facilidade de uso e total gratuidade. Queremos que você se
              concentre no que realmente importa — suas experiências, habilidades e
              conquistas — enquanto cuidamos de apresentá-las da melhor forma possível.
            </p>
            <p>
              Desde nosso lançamento, já ajudamos milhares de profissionais a criarem
              currículos que abriram portas e mudaram carreiras. Continuamos trabalhando
              todos os dias para melhorar nossa plataforma e ajudar ainda mais pessoas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-blue-500 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-4xl font-bold">Pronto para começar?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Junte-se a milhares de profissionais que já criaram seus currículos conosco.
          </p>
          <Link
            to="/edit"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition"
          >
            Criar Minha Conta Grátis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-[#f9fafb] py-12 text-center text-gray-600">
        <p>© 2025 Gerador de Currículos. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm">Feito com ❤️ para ajudar você a conquistar seu próximo emprego/estágio.</p>
      </footer>
    </div>
  );
}
