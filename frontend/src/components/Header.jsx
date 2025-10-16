import React from "react";

// import userAuth from '../hooks/userAuth.jsx';

import { AppBar, Toolbar, Box, Button, Typography, Container } from "@mui/material";
import { FileText, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Header({ onChangeTab }) {
  return (
    <AppBar
      position=""
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #f0f0f0",
        
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          {/* Logo + Nome */}
          <Box sx={{ display: "flex", marginLeft: "-15%" ,alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                background: "linear-gradient(to right, #6366F1, #8B5CF6)",
              }}
            />
            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1.2em",
                background: "linear-gradient(to right, #6366F1, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stage Maker
            </Typography>
          </Box>

          {/* Navegação */}
          <Box sx={{ display: "flex", marginLeft: "-82%",alignItems: "center", gap: 4 }}>
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Home
            </Typography>
            <Typography
              component={Link}
              to="/sobre"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Sobre
            </Typography>
          </Box>

          {/* Botões */}
          <Box sx={{ display: "flex",  marginRight: "-20%",alignItems: "center", gap: 3 }}>

              

            <Button
              component={Link}
              to="/auth/login"
              variant="outlined"
              size="small"
              startIcon={<User size={16} 
              style={{ verticalAlign: "middle" }}
              />}
              sx={{
                textTransform: "none",
                borderColor: "#e5e7eb",
                color: "#505050",
                fontWeight: 600,
              }}
              onClick={() => onChangeTab("login")}
            >
              Entrar
            </Button>

            <Button
              component={Link}
              to="/auth/signup"
              variant="contained"
              size="small"
              startIcon={<FileText size={15} 
              style={{ verticalAlign: "middle" }} 
              />}
              onClick={() => onChangeTab("signup")}
              sx={{
                textTransform: "none",
                backgroundColor: "#E2EAEF",
                color: "#505050",
                fontWeight: 600,
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
