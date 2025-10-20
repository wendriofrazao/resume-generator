import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { FileText, ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <div className="bg-[#F0F4FA] min-h-screen text-[#0F172A]">
      {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#2563EB]" />
            <span className="font-bold text-xl">Gerador de Currículos</span>
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-[#2563EB]/30 text-[#2563EB]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br bg-blue-50/60 from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF0FF]/75 px-4 py-2 text-sm font-medium text-[#2F6FFF] mb-6">
              <Shield className="h-4 w-4" />
              Sua Privacidade é Importante
            </div>
            <h1 className="text-5xl font-bold mb-6">Política de Privacidade</h1>
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
            <Card className="p-8 bg-gray-500">
              <p className="text-muted-foreground">
                Esta Política de Privacidade descreve como o Gerador de Currículos coleta, usa e protege 
                suas informações pessoais. Estamos comprometidos com a proteção de sua privacidade e 
                cumprimos todas as exigências da Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">1. Informações que Coletamos</h2>
              <p className="text-muted-foreground mb-4">
                Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Informações de Conta</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Nome completo</li>
                    <li>• Endereço de email</li>
                    <li>• Senha (criptografada)</li>
                    <li>• Data de criação da conta</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Informações do Currículo</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Dados pessoais que você escolher incluir</li>
                    <li>• Experiência profissional</li>
                    <li>• Formação acadêmica</li>
                    <li>• Habilidades e competências</li>
                    <li>• Informações de contato</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Informações de Uso</h3>
                  <ul className="space-y-2 text-muted-foreground ml-6">
                    <li>• Endereço IP</li>
                    <li>• Tipo de navegador</li>
                    <li>• Páginas visitadas</li>
                    <li>• Tempo de uso</li>
                    <li>• Dados de interação com o site</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">2. Como Usamos suas Informações</h2>
              <p className="text-muted-foreground mb-4">
                Utilizamos suas informações pessoais para os seguintes propósitos:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Fornecer e manter nossos serviços</li>
                <li>• Criar e gerenciar sua conta</li>
                <li>• Processar e armazenar seus currículos</li>
                <li>• Enviar notificações importantes sobre o serviço</li>
                <li>• Melhorar a experiência do usuário</li>
                <li>• Detectar e prevenir fraudes ou abusos</li>
                <li>• Cumprir obrigações legais</li>
                <li>• Responder a suas solicitações de suporte</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">3. Base Legal para Processamento</h2>
              <p className="text-muted-foreground mb-4">
                Processamos seus dados pessoais com base em:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• <strong className="text-foreground">Consentimento:</strong> Você nos dá permissão para processar seus dados</li>
                <li>• <strong className="text-foreground">Execução de Contrato:</strong> Necessário para fornecer nossos serviços</li>
                <li>• <strong className="text-foreground">Interesse Legítimo:</strong> Para melhorar nossos serviços e segurança</li>
                <li>• <strong className="text-foreground">Obrigação Legal:</strong> Para cumprir requisitos legais</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Informações</h2>
              <p className="text-muted-foreground mb-4">
                Levamos sua privacidade a sério e não vendemos suas informações pessoais. Podemos compartilhar 
                dados apenas nas seguintes circunstâncias:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• <strong className="text-foreground">Com seu Consentimento:</strong> Quando você autoriza explicitamente</li>
                <li>• <strong className="text-foreground">Prestadores de Serviço:</strong> Parceiros que nos ajudam a operar o site (todos obrigados por confidencialidade)</li>
                <li>• <strong className="text-foreground">Requisitos Legais:</strong> Quando exigido por lei ou ordem judicial</li>
                <li>• <strong className="text-foreground">Proteção de Direitos:</strong> Para proteger nossos direitos, privacidade, segurança ou propriedade</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">5. Segurança de Dados</h2>
              <p className="text-muted-foreground mb-4">
                Implementamos medidas técnicas e organizacionais para proteger suas informações:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Criptografia de dados em trânsito (SSL/TLS)</li>
                <li>• Criptografia de dados em repouso</li>
                <li>• Autenticação segura com hash de senhas</li>
                <li>• Backups regulares e redundância</li>
                <li>• Controles de acesso rigorosos</li>
                <li>• Monitoramento contínuo de segurança</li>
                <li>• Auditorias de segurança periódicas</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">6. Seus Direitos (LGPD)</h2>
              <p className="text-muted-foreground mb-4">
                Conforme a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• <strong className="text-foreground">Acesso:</strong> Confirmar se processamos seus dados</li>
                <li>• <strong className="text-foreground">Correção:</strong> Corrigir dados incompletos ou desatualizados</li>
                <li>• <strong className="text-foreground">Exclusão:</strong> Solicitar a exclusão de seus dados</li>
                <li>• <strong className="text-foreground">Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li>• <strong className="text-foreground">Revogação:</strong> Retirar seu consentimento</li>
                <li>• <strong className="text-foreground">Oposição:</strong> Opor-se ao processamento de seus dados</li>
                <li>• <strong className="text-foreground">Informação:</strong> Saber com quem compartilhamos seus dados</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Para exercer qualquer destes direitos, entre em contato conosco através de contato@geradordeCV.com
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">7. Retenção de Dados</h2>
              <p className="text-muted-foreground mb-4">
                Mantemos suas informações pessoais apenas pelo tempo necessário para:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Fornecer nossos serviços a você</li>
                <li>• Cumprir obrigações legais</li>
                <li>• Resolver disputas</li>
                <li>• Fazer cumprir nossos acordos</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Quando você excluir sua conta, seus dados serão permanentemente removidos dentro de 30 dias, 
                exceto quando devemos retê-los por obrigação legal.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">8. Cookies e Tecnologias Similares</h2>
              <p className="text-muted-foreground mb-4">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li>• Manter você conectado à sua conta</li>
                <li>• Lembrar suas preferências</li>
                <li>• Analisar o uso do site</li>
                <li>• Melhorar a experiência do usuário</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Você pode controlar cookies através das configurações do seu navegador, mas isso pode afetar 
                a funcionalidade do site.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">9. Privacidade de Menores</h2>
              <p className="text-muted-foreground">
                Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente informações 
                de menores de idade. Se descobrirmos que coletamos dados de um menor, tomaremos medidas para 
                excluí-los imediatamente.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">10. Alterações nesta Política</h2>
              <p className="text-muted-foreground">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
                mudanças significativas através do site ou por email. A data da última atualização está 
                sempre indicada no início desta política.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">11. Contato e Encarregado de Dados</h2>
              <p className="text-muted-foreground mb-4">
                Para questões sobre esta Política de Privacidade ou sobre seus dados pessoais, entre em contato:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Email:</strong> privacidade@geradordeCV.com</li>
                <li><strong className="text-foreground">Email do Encarregado (DPO):</strong> dpo@geradordeCV.com</li>
                <li><strong className="text-foreground">Telefone:</strong> +55 (98) 99999-9999</li>
                <li><strong className="text-foreground">Endereço:</strong> São luís, MA - Brasil</li>
              </ul>
            </Card>

            <div className="text-center pt-8">
              <p className="text-muted-foreground mb-6">
                Ao usar nossos serviços, você confirma que leu e compreendeu esta Política de Privacidade.
              </p>
              <Link to="/auth">
                <Button className="cursor-pointer hover:bg-gray-200" variant="secondary" size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Criar Minha Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};