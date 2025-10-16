import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const LoginNRegister = () => {
  const [tabValue, setTabValue] = useState("login");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(25,118,210,0.1), rgba(156,39,176,0.1))",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        {/* Cabeçalho */}
        <Box alignItems="center" textAlign="center" mb={2}>
          <Typography  variant="h4" fontWeight="bold">
            Gerador de Currículos
          </Typography>

          <Typography color="text.secondary">
            Crie seu currículo profissional
          </Typography>
        </Box>

        <Tabs
  value={tabValue}
  onChange={(_, newValue) => setTabValue(newValue)}
  centered
  TabIndicatorProps={{ style: { display: "none" } }}
  sx={{
    backgroundColor: "#6E7781",
    borderRadius: "1rem",
    mb: 1,
    p: "0.1rem",
    "& .MuiTab-root": {
      margin: "0.5rem",
      color: "#111827da",
      flex: 1,
      borderRadius: "8px",
      textTransform: "none",
      fontWeight: 500,
      transition: "all .4s ease-in-out",
    },
    "& .Mui-selected": {
      backgroundColor: "#fff",
      color: "#111827", 
    },
    "& .MuiTab-root.Mui-focusVisible": {
      backgroundColor: "#fff", 
      color: "#111827",
    },
    "& .MuiTab-root:hover": {
      backgroundColor: "#f3f4f6", 
    },
  }}
>
  <Tab value="login" label="Login" />
  <Tab value="signup" label="Criar Conta" />
</Tabs>
        {tabValue === "login" && <Login />}
        {tabValue === "signup" && <Register />}
      </Box>
    </Box>
  );
};

export default LoginNRegister;

