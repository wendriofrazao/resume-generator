import React from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { FileText, ArrowLeft, Target, TrendingUp, Users, Briefcase, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Box, Container , Typography  } from "@mui/material";

export function ConteinerDicas() {
    return (
    <div> 
      
    <Container
      className="bg-gray-500"
        maxWidth="max-w-dvw"
        sx={{
          display: "flex",
          height: 180,
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#F5F6FC"
        }}
      >

          <Box sx={{
            alignItems: "center",
            justifyContent: "center",
            }}>
              <Box 
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 150,
                      height: 45,
                      borderRadius: "50px",
                      backgroundColor: "#EAF0FF",
                      color: "#2F6FFF",
                      fontSize: "16px",
                      fontWeight: 600,
                      mx: "auto",
                      transition: "0.3s",
                      
                    }}
                  >
                    <span >
                      <Target size={15} />
                    </span>
                     <Typography  variant="body3" color="" fontWeight="text.secondary">Guia Completo</Typography>
                  </Box>
            <Typography variant="h5" sx={{ display: "flex", justifyContent: "center" }} fontWeight="bold">Dicas de Carreira</Typography>
            <Typography  variant="body2" fontWeight="text.secondary">Estategias e Orientaçoes Essenciais Impulsionaram Sua Carreira Proficional</Typography>
          </Box>
      
        
    </Container>
      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Tip 1 */}
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Invista em Desenvolvimento Contínuo</h2>
                  <p className="text-muted-foreground mb-4">
                    O mercado de trabalho está em constante evolução. Mantenha-se atualizado com cursos online, 
                    certificações e workshops. Plataformas como Coursera, Udemy e LinkedIn Learning oferecem 
                    excelentes oportunidades de aprendizado.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Dedique pelo menos 5 horas semanais ao aprendizado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Foque em habilidades relevantes para sua área</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Documente suas conquistas e certificações</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tip 2 */}
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Construa sua Rede de Contatos</h2>
                  <p className="text-muted-foreground mb-4">
                    Networking é fundamental para o crescimento profissional. Participe de eventos do setor, 
                    conecte-se com profissionais no LinkedIn e mantenha relacionamentos genuínos.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Participe de eventos e meetups da sua área</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Mantenha seu LinkedIn atualizado e ativo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Ofereça ajuda antes de pedir favores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tip 3 */}
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Desenvolva Soft Skills</h2>
                  <p className="text-muted-foreground mb-4">
                    Habilidades técnicas são importantes, mas soft skills como comunicação, liderança e 
                    trabalho em equipe são diferenciais competitivos essenciais.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Pratique comunicação clara e objetiva</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Desenvolva inteligência emocional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Aprenda a dar e receber feedback construtivo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tip 4 */}
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Construa sua Marca Pessoal</h2>
                  <p className="text-muted-foreground mb-4">
                    Sua marca pessoal é como você é percebido profissionalmente. Crie uma presença online 
                    consistente que reflita suas habilidades e valores.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Compartilhe conhecimento através de artigos e posts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Mantenha consistência em todas as plataformas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Crie um portfólio online com seus projetos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Tip 5 */}
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Busque Feedback e Mentoria</h2>
                  <p className="text-muted-foreground mb-4">
                    Ter um mentor e receber feedback regular são ferramentas poderosas para crescimento 
                    profissional. Busque orientação de profissionais mais experientes.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Identifique profissionais que admira e peça mentoria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Solicite feedback regular do seu gestor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Esteja aberto a críticas construtivas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-primary to-accent p-8 text-center">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Pronto para dar o próximo passo?
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Comece criando um currículo profissional que destaque suas conquistas
              </p>
              <Link to="/auth">
                <Button variant="secondary" size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Criar Meu Currículo
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
    );
}