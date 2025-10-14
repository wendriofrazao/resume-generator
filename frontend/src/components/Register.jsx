import {Box,TextField,Button,Card,CardContent,CardHeader } from "@mui/material";


export function Register (){
 return (
    <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Criar uma conta"
              subheader="Preencha os dados abaixo"
            />
            <CardContent>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  type="text"
                  margin="normal"
                  placeholder="João Silva"
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  margin="normal"
                  placeholder="seu@email.com"
                />
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  margin="normal"
                  placeholder="••••••••"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Criar Conta
                </Button>
              </Box>
            </CardContent>
          </Card>
)}
