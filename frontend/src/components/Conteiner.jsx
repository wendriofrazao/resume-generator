import img from '../assets/img/imagem_do_resume.jpg'
import { Box, Container, Grid, Typography, Button, Card, Stack } from "@mui/material";
import { Sparkles, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Conteiner() {
    
    return (
        <div className='min-h-screen'>

    <Box
      sx={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(to bottom right, var(--mui-palette-background-paper), rgba(0,0,0,0.02))",
        }}
        >
      <Container sx={{ py: { xs: 10, md: 16 } }}>
        <Grid container alignItems="spacing={8}">
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Box
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                  gap: 1,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: 999,
                  px: 2,
                  py: 0.5,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                <Sparkles size={18} />
                Crie seu currícul5 profissional
              </Box>

              <Typography
                variant="h2"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Seu currículo  perfeito em{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  minutos
                </Box>
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500 }}>
                Plataforma profissional para criar currículos impressionantes que destacam suas
                conquistas e experiências. Simples, rápido e eficaz.
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                  component={Link}
                  variant="contained"
                  size="large"
                  startIcon={<FileText size={20} />}
                  >
                   Criar Meu Currículo
                </Button>

                <Button variant="outlined" size="large">
                  Ver Exemplos
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={img}
              alt="Plataforma de criação de currículos"
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                width: "100%",
                animation: "slideUp 1s ease",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Elementos decorativos */}
      <Box
        sx={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 250,
            height: 250,
            bgcolor: "primary.main",
            opacity: 0.2,
            borderRadius: "50%",
            filter: "blur(100px)",
        }}
        />
      <Box
        sx={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 250,
            height: 250,
            bgcolor: "secondary.main",
            opacity: 0.2,
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />
    </Box>
</div>
    )
    
}

