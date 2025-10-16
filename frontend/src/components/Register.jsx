import React from "react";
import { useState } from "react";
import {Box,TextField,Button,Card,CardContent,CardHeader } from "@mui/material";
import { useAuth } from "../hooks/userAuth.jsx"

export function Register (){
    const { register } = useAuth();
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


      const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await register(fullname, email, password);

        if (res?.user) {
           setMessage("Conta criada com sucesso!");
        } else {
           setMessage(res?.message || "Erro ao criar conta");
        } 
      }

 return (
    <Card sx={{ borderRadius: "1rem" }}>
            <CardHeader
              
              title="Criar uma conta"
              subheader="Preencha os dados abaixo"
            />
            <CardContent sx={{ pt: 0, pb: 0 }}>
              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  type="text"
                  margin="normal"
                  placeholder="João Silva"
                  required
                  sx={{
                  "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
                 },
                }}
                onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  margin="normal"
                  placeholder="seu@email.com"
                  required
                  sx={{
                  "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  margin="normal"
                  placeholder="••••••••"
                  required
                  sx={{
                 "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
                },
                  }}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    backgroundColor: "#2563EB",
                      "&:hover": {
                    backgroundColor: "#1E40AF", 
                  },
                  }}
                  type="submit"
                >
                  Criar Conta
                </Button>
                {message && <Box mt={2} color={message.includes("sucesso") ? "green" : "red"}>{message}</Box>}
              </Box>
            </CardContent>
          </Card>
)}
