import React from "react";
import { Box, Container as MUIContainer, Grid, Typography, Button } from "@mui/material";
import FileTextIcon from "@mui/icons-material/Article";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
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
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#F9FAFB",
          py: { xs: 10, md: 8 },
        }}
      >
        <MUIContainer maxWidth="xl">
          <Grid container spacing={3} alignItems="center"  columns={12}>
            {/* Left Side */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: "999px",
                      backgroundColor: "#3c8aff25",
                      fontWeight: 500,
                      color: "#3C8BFF",
                      maxWidth: '42%',
                      maxHeight: "32px"
                    }}
                  >
                    <SparklesIcon sx={{ fontSize: 16 }} />
                    Crie seu currículo profissional
                  </Box>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                      fontWeight: "bold",
                      lineHeight: 1.1,
                    }}
                  >
                    Seu currículo perfeito em{" "}
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(to right, #3C8BFF, #8B4DFF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      minutos
                    </Box>
                  </Typography>

                  <Typography sx={{ fontSize: "1.3rem", fontWeight: "500", color: "#777777" }} variant="body3" color="text.secondary">
                    Plataforma profissional para criar currículos impressionantes que destacam suas
                    conquistas e experiências. Simples, rápido e eficaz.
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Link to={user ? "/dashboard" : "/auth"} style={{ textDecoration: "none" }}>
                      <Button variant="contained" size="large" sx={{
                          background: "linear-gradient(to right, #3C8BFF, #8B4DFF)",
                          border: "1px #00000028 solid",
                          boxShadow: "none",
                          color: "#FFFFFF",
                          fontWeight: "600"
                      }}
                      startIcon={<FileTextIcon />}>
                      {user ? "Meus Currículos" : "Criar Meu Currículo"}
                      </Button>
                    </Link>
                    <Button variant="outlined" size="large" sx={{
                        border: "1px #E5E7EB solid",
                        color: "#111827",
                        fontWeight: "600",
                        backgroundColor: "#FFFFFF"
                    }}>
                      Ver Exemplos
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Side */}
            <Grid  xs={12} lg={6}>
              <motion.div initial="hidden" animate="visible" variants={slideUp}>
                <Box 
                  component="img"
                  src={heroImage}
                  alt="Plataforma de criação de currículos"
                  sx={{ borderRadius: 3, boxShadow: 3, height: "70%" ,width: "48%",position: "absolute",
                    top: 100,
                    right: 50,
                  }}
            
                />
              </motion.div>
            </Grid>
          </Grid>
        </MUIContainer>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
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
      <Box component="section" sx={{ py: 20, backgroundColor: "grey.100" }}>
        <MUIContainer maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" mb={0.9}>
              Como funciona?
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Três passos simples para seu currículo profissional
            </Typography>
          </Box>

          <Grid container spacing={12} alignItems="center" columns={3}>
            {[
              {
                step: 1,
                title: "Cadastre-se Grátis",
                description:
                  "Crie sua conta em segundos. Sem taxas, sem compromisso. Comece imediatamente.",
              },
              {
                step: 2,
                title: "Preencha suas Informações",
                description:
                  "Adicione suas experiências, formação acadêmica, habilidades e conquistas profissionais.",
              },
              {
                step: 3,
                title: "Baixe e Compartilhe",
                description:
                  "Exporte seu currículo em PDF de alta qualidade e envie para as empresas dos seus sonhos.",
              },
            ].map((item, index) => (
              <Grid xs={12} md={4} key={item.step} textAlign="center">
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
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      fontSize: 32,
                      fontWeight: "bold",
                      mx: "auto",
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h5" mb={1} fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </MUIContainer>
      </Box>
    </>
  );
};
