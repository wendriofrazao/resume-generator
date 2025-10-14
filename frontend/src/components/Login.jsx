import {Box,TextField,Button,Card,CardContent,CardHeader } from "@mui/material";



export function Login() {
 return (
 <Card sx={{ mt: 2 }}>
            <CardHeader
              title="Bem-vindo de volta"
              subheader="Entre com suas credenciais"
            />
            <CardContent>
              <Box component="form" sx={{ mt: 1 }}>
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
                  Entrar
                </Button>
              </Box>
            </CardContent>
 </Card>
 )
}