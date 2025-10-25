import React from "react";
import { Box, Container as MUIContainer, Grid, Typography, Button, Card, CardContent  } from "@mui/material";
import FileTextIcon from "@mui/icons-material/Article";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import { Bolt, AutoAwesome, Download } from "@mui/icons-material";
import { FileText } from "lucide-react";
import { Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/img/imagem_do_resume.jpg";


export const Conteiner = ({ user }) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {/* Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-20 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texto principal */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
              <Sparkles className="h-4 w-4" />
              Crie seu currículo profissional
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Seu currículo perfeito em{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                minutos
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl">
              Plataforma profissional para criar currículos impressionantes que
              destacam suas conquistas e experiências. Simples, rápido e eficaz.
            </p>

            {/* Botões */}
            <div className="flex flex-wrap gap-4">
              <Link to={user ? "/dashboard" : "/auth/login"}>
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700">
                  <FileText className="h-5 w-5" />
                  {user ? "Meus Currículos" : "Criar Meu Currículo"}
                </button>
              </Link>

              <Link to={"/sobre"}>
                <button className="rounded-lg cursor-pointer border border-gray-300 bg-white px-6 py-3 text-lg font-semibold text-gray-700 transition hover:bg-gray-50">
                  Saiba Mais
                </button>
              </Link>
            </div>
          </div>

          {/* Imagem */}
          <div className="animate-slide-up flex justify-center">
            <img
              src={heroImage}
              alt="Plataforma de criação de currículos"
              className=" w-full max-w-6xl h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Elementos decorativos suaves */}
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />
    </section>

      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            bottom: -128,
            left: -128,
            width: 256,
            height: 256,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.2,
            filter: "blur(64px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -128,
            right: -128,
            width: 256,
            height: 256,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            opacity: 0.2,
            filter: "blur(64px)",
          }}
        />
      </Box>

      {/* How it Works Section */}
      <Box component="section" sx={{ py: 8, backgroundColor: "grey.100"
       }}>
        <MUIContainer maxWidth="lg" >
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" sx={{ fontWeight: 600 }} mb={0.9}>
              Como funciona?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Três passos simples para seu currículo profissional
            </Typography>
          </Box>

          <Grid container spacing={4}  sx={{  display: "flex", justifyContent: "center", alignItems: "flex-start",}}>
            {[
              {
                step: 1,
                title: "Cadastre-se Grátis",
                description:
                  "Crie sua conta em segundos. Sem taxas, sem compromisso. \nComece imediatamente.",
              },
              {
                step: 2,
                title: "Preencha suas Informações",
                description:
                  "Adicione suas experiências, formação acadêmica, \nhabilidades e conquistas profissionais.",
              },
              {
                step: 3,
                title: "Baixe e Compartilhe",
                description:
                  "Exporte seu currículo em PDF de alta qualidade e envie \npara as empresas dos seus sonhos.",
              },
            ].map((item, index) => (
              <Grid xs={12} md={4} sx={{ textAlign: "center" ,}} key={item.step}>
                
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.3 } },
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      mx: "auto",
                      
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h5" mb={1} fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{whiteSpace: "pre-line"}} >
                    {item.description}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </MUIContainer>
      </Box>

      {/* Por que escolher nossa plataforma */}
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        {/* Cabeçalho */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Por que escolher o nosso site?
          </h2>
          <p className="text-xl text-gray-600">
            Ferramentas poderosas para criar o currículo dos seus sonhos
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-all group-hover:scale-110">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Rápido e Intuitivo</h3>
            <p className="text-gray-600">
              Interface simples e intuitiva que permite criar seu currículo em poucos minutos, sem complicações.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-all group-hover:scale-110">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Design Profissional</h3>
            <p className="text-gray-600">
              Templates modernos e elegantes que destacam suas qualificações e impressionam recrutadores.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-all group-hover:scale-110">
              <Download className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Exportação Fácil</h3>
            <p className="text-gray-600">
              Baixe seu currículo em PDF de alta qualidade, pronto para enviar para oportunidades de emprego.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Perguntas frequentes */}
     <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre nossa plataforma
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-6">
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-bold">É realmente gratuito?</h3>
              <p className="text-muted-foreground">
                Sim! Nosso site é 100% gratuita. Você pode criar, editar e baixar quantos 
                currículos quiser sem pagar nada.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-bold">Preciso de conhecimentos técnicos?</h3>
              <p className="text-muted-foreground">
                Não! Nossa interface foi projetada para ser extremamente intuitiva. Se você sabe 
                usar email, você consegue criar seu currículo aqui.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-bold">Posso editar meu currículo depois?</h3>
              <p className="text-muted-foreground">
                Com certeza! Você pode editar seu currículo quantas vezes quiser. Todas as suas 
                alterações são salvas automaticamente.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-bold">Em que formato posso baixar?</h3>
              <p className="text-muted-foreground">
                Você pode exportar seu currículo em PDF de alta qualidade, pronto para enviar 
                para empresas ou imprimir.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-3 text-xl font-bold">Meus dados estão seguros?</h3>
              <p className="text-muted-foreground">
                Absolutamente! Utilizamos as melhores práticas de segurança para proteger suas 
                informações pessoais e profissionais.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pode criar seu currículo */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 p-12 text-center shadow-2xl">
            {/* Padrão de fundo sutil */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

            {/* Conteúdo */}
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Pronto para criar seu currículo?
              </h2>
              <p className="mb-8 text-xl text-white/90">
                Comece agora e dê o próximo passo na sua carreira profissional
              </p>

              <Link to={user ? "/dashboard" : "/auth"}>
                <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium text-gray-800 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <FileText className="h-5 w-5 text-blue-600" />
                  {user ? "Acessar Dashboard" : "Começar Agora - É Grátis"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
