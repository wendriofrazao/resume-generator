import React from "react";
import { useState, useEffect} from "react";
import { Box, TextField, Button, Card, CardContent, CardHeader } from "@mui/material";
import { useAuth } from '../hooks/userAuth.jsx';
import {useLocation, useNavigate} from 'react-router-dom'

export function Login() {
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {if (user) {navigate(from, { replace: true });}}, [user, navigate, from]);

    const handleSubmit = async (event) => {
      event.preventDefault();

     const res = await login(email, password);

    if (res?.user) {
      setMessage("Conta logada com sucesso!");
      navigate("/dashboard"); 
    } else {
      setMessage(res?.message || "Erro ao entrar na sua conta");
    } 
  }


  return (
    <Card sx={{ borderRadius: "1rem" }}>
      <CardHeader
        title="Bem-vindo de volta"
        subheader="Entre com suas credenciais"
      />
      <CardContent sx={{ pt: 0, pb: 0 }}>
        <Box component="form" sx={{ mt: 1, borderRadius: "1rem"}} onSubmit={handleSubmit}>
          <TextField
          fullWidth
          label="E-mail"
          type="email"
          margin="normal"
          placeholder="seu@email.com"
          required
          value={email}
          sx={{
          "& .MuiOutlinedInput-root": {
          borderRadius: "1rem", 
          },
          }}
          onChange={(e) => {setEmail(e.target.value)}}
        />

        <TextField
          fullWidth
          label="Senha"
          type="password"
          margin="normal"
          placeholder="••••••••"
          required
          value={password}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1rem",
            },
          }}
          onChange={(e) => {setPassword(e.target.value)}}
        />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#2563EB",
              "&:hover": {
                backgroundColor: "#1E40AF", 
              },
            }}
            type="submit"
          >
            Entrar
          </Button>
          {message && <Box mt={2} color={message.includes("sucesso") ? "green" : "red"}>{message}</Box>}
        </Box>
      </CardContent>
    </Card>
  );
}
