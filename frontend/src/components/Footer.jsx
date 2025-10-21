import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link as MuiLink } from "@mui/material";
import { FileText, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: "divider", bgcolor: "#e7eaed58", pt: 8, pb: 4 }}>
      <Container maxWidth="lvw" >
        <Grid container spacing={8}>
          {/* Brand Section */}
          <Grid xs={12} sx={{ maxWidth: "16%", textAlign: "start", marginLeft: "15%" }} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <FileText size={20} color="#1976d2fa" />
              <Typography variant="h6" fontWeight="bold">
                Gerador de Currículos
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Sua plataforma profissional para criar currículos impressionantes que destacam suas conquistas e garantem sua próxima oportunidade.
            </Typography>
            <Box display="flex" gap={1} mt={2}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  href="#"
                  sx={{
                    bgcolor: "#3c8aff25",
                    color: "primary.main",
                    "&:hover": { bgcolor: "primary.main", color: "primary.contrastText" }
                  }}
                >
                  <Icon size={20} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Links Rápidos
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink component={Link} to="/" underline="hover" color="text.secondary">
                Início
              </MuiLink>
              <MuiLink component={Link} to="/auth/login" underline="hover" color="text.secondary">
                Criar Conta
              </MuiLink>
              <MuiLink component={Link} to="/dashboard" underline="hover" color="text.secondary">
                Meus Currículos
              </MuiLink>
              <MuiLink href="/sobre" underline="hover" color="text.secondary">
                Saiba Mais
              </MuiLink>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item sx={{ marginLeft: "10%" }} >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Recursos
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink component={Link} to="/dicas-carreira" underline="hover" color="text.secondary">
                Dicas de Carreira
              </MuiLink>
              <MuiLink component={Link} to="/como-escrever-cv" underline="hover" color="text.secondary">
                Como Escrever um CV
              </MuiLink>
              <MuiLink component={Link} to="/termos" underline="hover" color="text.secondary">
                Termos de Uso
              </MuiLink>
              <MuiLink component={Link} to="/privacidade" underline="hover" color="text.secondary">
                Política de Privacidade
              </MuiLink>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Contato
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <Mail size={16} color="#1976d2" />
                <Typography variant="body2" color="text.secondary">
                  example@gmail.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone size={16} color="#1976d2" />
                <Typography variant="body2" color="text.secondary">
                  +55 (98) 99999-9999
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start" gap={1}>
                <MapPin size={16} color="#1976d2" />
                <Typography variant="body2" color="text.secondary">
                  São Luís, MA<br />Brasil
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box mt={6} pt={4} borderTop={1} borderColor="divider" display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Gerador de Currículos. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
