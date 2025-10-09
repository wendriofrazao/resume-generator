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
4. Clique em **Gerar Portfólio**.  
5. Compartilhe o link e pronto!  

---

## 🛠️ Tecnologias utilizadas  
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js / Express / Handlebars / nodemon
- **Banco de Dados:** MongoDB  

---

## 📂 Estrutura do projeto  
- Backend:
```bash
├── 📁 configs/
│   ├── 📄 db.js
│   └── 📄 mailtrap.js
├── 📁 controllers/
│   ├── 📄 authController.js
│   ├── 📄 otpController.js
│   └── 📄 resumeController.js
├── 📁 middlewares/
│   ├── 📄 authMiddleware.js
│   ├── 📄 authValidateMiddleware.js
│   ├── 📄 flashMessage.js
│   └── 📄 setSession.js
├── 📁 models/
│   ├── 📄 Education.js
│   ├── 📄 PersonalDetails.js
│   ├── 📄 Resume.js
│   ├── 📄 Skill.js
│   ├── 📄 Template.js
│   ├── 📄 User.js
│   └── 📄 WorkExperience.js
├── 📁 public/
│   ├── 📁 assets/
│   └── 📁 css/
│       ├── 🎨 404.css
│       ├── 🎨 500.css
│       ├── 🎨 style.css
│       └── 🎨 workTemplate.css
├── 📁 routes/
│   ├── 📄 authRoutes.js
│   ├── 📄 otpRoutes.js
│   └── 📄 resumeRoute.js
├── 📁 services/
│   ├── 📄 otpService.js
│   ├── 📄 resumeService.js
│   └── 📄 userServices.js
├── 📁 sessions/
│   └── 📄 session.js
├── 📁 uploads/
│   └── 🖼️ 1756775896662-788198395.jpg
├── 📁 utils/
│   └── 📁 helpers/
│       ├── 📄 generateOtp.js
│       └── 📄 upload.js
├── 📁 validators/
│   └── 📄 authValidator.js
├── 📁 views/
│   ├── 📁 errors/
│   │   ├── 📄 404.handlebars
│   │   └── 📄 500.handlebars
│   ├── 📁 layouts/
│   │   ├── 📄 erros.handlebars
│   │   ├── 📄 main.handlebars
│   │   └── 📄 templates.handlebars
│   └── 📁 template/
│       ├── 📄 internship.handlebars
│       └── 📄 work.handlebars
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 server.js
└── 📄 text.txt
```
Frontend:
