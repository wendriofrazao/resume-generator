# Gerador de Currículos

Um site simples e prático para criar e compartilhar currículos online.  
Com ele, qualquer pessoa pode montar um portfólio elegante e responsivo em poucos cliques, sem precisar de conhecimentos técnicos.  

---

## ✨ Funcionalidades  
- Criação de currículos online em minutos  
- Personalização de informações (nome, bio, habilidades, projetos, contatos)  
- Design responsivo e moderno  
- Compartilhamento fácil via link único  
- Edição rápida e intuitiva  

---

## 🚀 Como usar  
1. Acesse o site.  
2. Preencha seus dados pessoais e profissionais.  
3. Adicione seus projetos e habilidades.  
4. Clique em **Baixar PDF**.  
5. Compartilhe o link e pronto!  

---

## 🛠️ Tecnologias utilizadas  
- **Frontend:** React.js + Vite / Tailwind / Material UI
- **Backend:** Node.js / Express / Handlebars / bcrypt / nodemailer / validator / cookie-session / express-session
- **Banco de Dados:** MongoDB
- **Teste de APIs:** Postman

---

## 📂 Estrutura do projeto  
Backend:
```bash
├── 📁 configs
│   ├── 📄 db.js
│   └── 📄 template.js
├── 📁 controllers
│   ├── 📄 authController.js
│   ├── 📄 otpController.js
│   ├── 📄 resumeController.js
│   └── 📄 templateController.js
├── 📁 middlewares
│   ├── 📄 authMiddleware.js
│   ├── 📄 authValidateMiddleware.js
│   ├── 📄 flashMessage.js
│   └── 📄 setSession.js
├── 📁 models
│   ├── 📄 Education.js
│   ├── 📄 PersonalDetails.js
│   ├── 📄 Resume.js
│   ├── 📄 Skill.js
│   ├── 📄 Template.js
│   ├── 📄 User.js
│   └── 📄 WorkExperience.js
├── 📁 public
│   ├── 📁 assets
│   └── 📁 css
│       ├── 🎨 404.css
│       ├── 🎨 500.css
│       ├── 🎨 personal.css
│       ├── 🎨 style.css
│       └── 🎨 workTemplate.css
├── 📁 routes
│   ├── 📄 authRoutes.js
│   ├── 📄 otpRoutes.js
│   ├── 📄 resumeRoute.js
│   └── 📄 templateRoute.js
├── 📁 services
│   ├── 📄 otpService.js
│   ├── 📄 resumeService.js
│   ├── 📄 templateService.js
│   └── 📄 userServices.js
├── 📁 utils
│   └── 📁 helpers
│       ├── 📄 generateOtp.js
│       └── 📄 upload.js
├── 📁 validators
│   └── 📄 authValidator.js
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 server.js
```
Frontend:

```bash
├── 📁 public
├── 📁 src
│   ├── 📁 assets
│   │   ├── 📁 fonts
│   │   ├── 📁 icon
│   │   │   └── 🖼️ Prancheta4.png
│   │   └── 📁 img
│   │       ├── 🖼️ brilhar.png
│   │       ├── 🖼️ curriculoIcon.svg
│   │       ├── 🖼️ espumante.png
│   │       ├── 🖼️ imagem_do_resume.jpg
│   │       ├── 🖼️ profileDefault.svg
│   │       └── 🖼️ raio.png
│   ├── 📁 components
│   │   ├── 📁 ui
│   │   │   ├── 📁 uicards
│   │   │   │   ├── 📄 CardAbout.jsx
│   │   │   │   ├── 📄 CardContent.jsx
│   │   │   │   ├── 📄 CardHeader.jsx
│   │   │   │   └── 📄 CardTitle.jsx
│   │   │   ├── 📄 accordion.jsx
│   │   │   ├── 📄 button.jsx
│   │   │   ├── 📄 card.jsx
│   │   │   ├── 📄 input.jsx
│   │   │   ├── 📄 label.jsx
│   │   │   ├── 📄 tabs.jsx
│   │   │   └── 📄 textarea.jsx
│   │   ├── 📄 About.jsx
│   │   ├── 📄 Conteiner.jsx
│   │   ├── 📄 ConteinerComoEscreverUmCv.jsx
│   │   ├── 📄 ConteinerDicas.jsx
│   │   ├── 📄 ConteinerInsering.jsx
│   │   ├── 📄 EmailVerification.jsx
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 LoggedHeader.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 PageHeader.jsx
│   │   ├── 📄 PrivateConteiner.jsx
│   │   ├── 📄 ProtectRoute.jsx
│   │   ├── 📄 Register.jsx
│   │   ├── 📄 ResumePreview.jsx
│   │   ├── 📄 Termo.jsx
│   │   ├── 📄 Welcome.jsx
│   │   ├── 📄 editationResume.jsx
│   │   └── 📄 resumeEdit.jsx
│   ├── 📁 hooks
│   │   ├── 📄 resumeHook.jsx
│   │   └── 📄 userAuth.jsx
│   ├── 📁 lib
│   │   └── 📄 utils.jsx
│   ├── 📁 pages
│   │   ├── 📄 AboutPages.jsx
│   │   ├── 📄 ComoEscreverUmCv.jsx
│   │   ├── 📄 DashBoard.jsx
│   │   ├── 📄 DicaDeCarreira.jsx
│   │   ├── 📄 EditDataResume.jsx
│   │   ├── 📄 EmailVerificationPage.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 InseringDataResume.jsx
│   │   ├── 📄 LoginNRegister.jsx
│   │   ├── 📄 Private.jsx
│   │   └── 📄 TermUse.jsx
│   ├── 📁 routes
│   │   └── 📄 Routes.jsx
│   ├── 📁 service
│   │   ├── 📄 ResumeService.jsx
│   │   ├── 📄 TemplateService.jsx
│   │   └── 📄 authService.jsx
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
```
