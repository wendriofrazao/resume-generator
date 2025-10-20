import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { FileText, ArrowLeft, Scale } from "lucide-react";
import { Link } from "react-router-dom";    
import React from "react";

      
export function UseTerm() {
    return (
    <div>
             {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Gerador de Currículos</span>
          </Link>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Scale className="h-4 w-4" />
              Documentos Legais
            </div>
            <h1 className="text-5xl font-bold mb-6">Termos de Uso</h1>
            <p className="text-xl text-muted-foreground">
              Última atualização: Janeiro de 2024
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-muted-foreground mb-4">
                Ao acessar e usar o Gerador de Currículos, você concorda em cumprir estes Termos de Uso. 
                Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
              <p className="text-muted-foreground">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Mudanças significativas 
                serão comunicadas através do site ou por email.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">2. Uso do Serviço</h2>
              <p className="text-muted-foreground mb-4">
                O Gerador de Currículos fornece uma plataforma para criação e gerenciamento de currículos profissionais. 
                Você concorda em usar o serviço apenas para fins legais e profissionais.
              </p>
              <p className="text-muted-foreground font-semibold mb-2">Você NÃO PODE:</p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Usar o serviço para criar conteúdo ilegal, ofensivo ou fraudulento</li>
                <li>• Tentar acessar áreas restritas do sistema</li>
                <li>• Interferir no funcionamento normal do serviço</li>
                <li>• Copiar, modificar ou distribuir o conteúdo do site sem autorização</li>
                <li>• Usar o serviço para spam ou phishing</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">3. Conta de Usuário</h2>
              <p className="text-muted-foreground mb-4">
                Para usar nossos serviços, você precisa criar uma conta fornecendo informações precisas e completas. 
                Você é responsável por manter a confidencialidade de suas credenciais de acesso.
              </p>
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Responsabilidades do Usuário:</strong>
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Manter suas informações de conta atualizadas</li>
                <li>• Proteger sua senha e não compartilhá-la</li>
                <li>• Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                <li>• Ser responsável por todas as atividades em sua conta</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">4. Propriedade Intelectual</h2>
              <p className="text-muted-foreground mb-4">
                O conteúdo que você cria (seu currículo) pertence a você. No entanto, o design, código, marca e 
                todos os outros elementos do site são propriedade do Gerador de Currículos.
              </p>
              <p className="text-muted-foreground">
                Ao usar nosso serviço, você nos concede uma licença limitada para processar, armazenar e exibir 
                seu conteúdo apenas para fornecer o serviço a você.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">5. Privacidade e Proteção de Dados</h2>
              <p className="text-muted-foreground mb-4">
                Levamos sua privacidade a sério. Coletamos e processamos suas informações pessoais de acordo 
                com nossa Política de Privacidade e com a Lei Geral de Proteção de Dados (LGPD).
              </p>
              <p className="text-muted-foreground">
                Seus dados pessoais são criptografados e armazenados com segurança. Nunca venderemos ou 
                compartilharemos suas informações com terceiros sem seu consentimento explícito.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitação de Responsabilidade</h2>
              <p className="text-muted-foreground mb-4">
                O Gerador de Currículos é fornecido "como está". Embora nos esforcemos para manter o serviço 
                funcionando perfeitamente, não garantimos que ele será ininterrupto ou livre de erros.
              </p>
              <p className="text-muted-foreground mb-2">
                <strong className="text-foreground">Nós NÃO somos responsáveis por:</strong>
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Perda de dados devido a falhas técnicas</li>
                <li>• Resultados de processos seletivos ou entrevistas</li>
                <li>• Conteúdo criado por usuários</li>
                <li>• Danos indiretos ou consequenciais</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">7. Cancelamento e Exclusão</h2>
              <p className="text-muted-foreground mb-4">
                Você pode cancelar sua conta a qualquer momento através das configurações da sua conta. 
                Ao cancelar, seus dados serão excluídos permanentemente dentro de 30 dias.
              </p>
              <p className="text-muted-foreground">
                Reservamos o direito de suspender ou encerrar contas que violem estes Termos de Uso.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">8. Lei Aplicável</h2>
              <p className="text-muted-foreground mb-4">
                Estes Termos de Uso são regidos pelas leis brasileiras. Quaisquer disputas serão resolvidas 
                nos tribunais competentes do Brasil.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">9. Contato</h2>
              <p className="text-muted-foreground mb-4">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Email:</strong> contato@geradordeCV.com</li>
                <li><strong className="text-foreground">Telefone:</strong> +55 (11) 99999-9999</li>
              </ul>
            </Card>

            <div className="text-center pt-8">
              <p className="text-muted-foreground mb-6">
                Ao continuar usando nossos serviços, você confirma que leu e concordou com estes termos.
              </p>
              <Link to="/auth">
                <Button size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Criar Minha Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    )
}