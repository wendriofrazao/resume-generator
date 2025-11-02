import mongoose from 'mongoose';
import Template from '../models/Template.js'

const cvTemplate = {
  name: "CV Template",
  thumbnail: "/thumbnails/cv-moderno.png",
  category: "Curriculum Vitae",
  htmlContent: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{fullName}} — CV</title>
  </head>

  <body>
    <div class="cv">
      <!-- HEADER -->
      <header class="cv-header">
        <div class="info">
          <h1>{{fullName}}</h1>
          <p>{{cityCountry}} · {{citizenship}}</p>
        </div>
        <div class="contacts">
          <a href="tel:{{phone}}">{{phone}}</a>
          <a href="mailto:{{email}}">{{email}}</a>
          <a href="{{website}}">Website</a>
          <a href="{{github}}">GitHub</a>
          <a href="{{linkedin}}">LinkedIn</a>
        </div>
      </header>

      <!-- EXPERIENCE -->
      {{#if experiences.length}}
      <section>
        <h2>Experience</h2>
        {{#each experiences}}
          <div class="item">
            <div class="item-header">
              <h3>{{this.company}}</h3>
              <span>{{this.startMonth}} – {{this.endMonth}}</span>
            </div>
            <p class="role">{{this.jobTitle}}</p>
            <ul>
              {{#each this.responsibilities}}
                <li>{{this.text}}</li>
              {{/each}}
            </ul>
          </div>
        {{/each}}
      </section>
      {{/if}}

      <!-- PROJECTS -->
      {{#if projects.length}}
      <section>
        <h2>Projects</h2>
        {{#each projects}}
          <div class="item">
            <div class="item-header">
              <h3>{{this.name}}</h3>
              <span>{{this.date}}</span>
            </div>
            <p class="tech">{{this.technologies}}</p>
            <ul>
              {{#each this.descriptions}}
                <li>{{this.text}}</li>
              {{/each}}
            </ul>
          </div>
        {{/each}}
      </section>
      {{/if}}

      <!-- EDUCATION -->
      {{#if education.length}}
      <section>
        <h2>Education</h2>
        {{#each education}}
          <div class="item">
            <div class="item-header">
              <h3>{{this.university}}</h3>
              <span>{{this.startMonth}} – {{this.endMonth}}</span>
            </div>
            <p class="degree">{{this.degree}}</p>
          </div>
        {{/each}}
      </section>
      {{/if}}

      <!-- SKILLS -->
      {{#if skills.length}}
      <section>
        <h2>Skills</h2>
        <ul class="skills">
          {{#each skills}}
            <li><strong>{{this.name}}</strong>: {{this.level}}</li>
          {{/each}}
        </ul>
      </section>
      {{/if}}
    </div>
  </body>
</html>`,
 cssContent: `/* === GENERAL === */
body {
  font-family: "Helvetica", "Arial", sans-serif;
  background: #f8f8f8;
  color: #222;
  margin: 0;
  padding: 0;
}

.cv {
  background: #fff;
  width: 750px;
  margin: 40px auto;
  padding: 40px 60px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* === REGRAS DE QUEBRA DE PÁGINA - SEÇÕES NUNCA CORTADAS === */
@media print {
  body {
    background: white;
    margin: 0;
    padding: 0;
  }
  
  .cv {
    margin: 0;
    padding: 30px 50px;
    box-shadow: none;
    width: 100%;
    height: auto;
  }
  
  /* REGRA PRINCIPAL: NENHUMA SEÇÃO PODE SER CORTADA */
  section {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    page-break-before: auto;
    page-break-after: auto;
  }
  
  /* Se uma seção não couber na página atual, 
     força quebra ANTES dela para ir para próxima página */
  section {
    page-break-before: auto;
  }
  
  /* Garante que itens dentro das seções também não sejam cortados */
  .item {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  /* Skills - tratamento especial */
  .skills {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  .skills li {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  /* Header - mantém junto se possível */
  .cv-header {
    page-break-after: avoid;
  }
  
  /* Controla margens para maximizar espaço útil */
  @page {
    margin: 1.2cm;
    size: A4;
  }
  
  @page :first {
    margin-top: 1.5cm;
  }
}

/* === HEADER === */
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  margin-bottom: 25px;
}

.cv-header .info h1 {
  font-size: 24px;
  margin: 0;
}

.cv-header .info p {
  margin-top: 4px;
  color: #555;
  font-size: 13px;
}

.cv-header .contacts a {
  display: inline-block;
  margin-left: 15px;
  color: #0077cc;
  text-decoration: none;
  font-size: 13px;
}

.cv-header .contacts a:hover {
  text-decoration: underline;
}

/* === SECTION === */
section {
  margin-top: 25px;
  /* Garante que cada seção seja um bloco coeso */
  display: block;
}

section h2 {
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 3px;
  margin-bottom: 12px;
  /* Mantém o título junto com o conteúdo */
  page-break-after: avoid;
}

/* === ITEM === */
.item {
  margin-bottom: 16px;
  /* Itens mantêm-se íntegros */
  display: block;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-header h3 {
  font-size: 14px;
  margin: 0;
  font-weight: bold;
}

.item-header span {
  font-size: 12px;
  color: #555;
}

.role, .tech, .degree {
  margin: 3px 0 6px 0;
  font-size: 13px;
  color: #444;
}

ul {
  list-style-type: disc;
  margin: 0 0 0 20px;
  padding: 0;
}

ul li {
  margin-bottom: 4px;
  font-size: 12.5px;
  /* Itens de lista também não quebram */
  page-break-inside: avoid;
}

/* === SKILLS === */
.skills {
  list-style: none;
  padding: 0;
  display: block;
}

.skills li {
  margin-bottom: 6px;
  font-size: 13px;
  display: block;
}`,
  variables: [
    { 
      name: "fullName", 
      type: "string", 
      required: true, 
      defaultValue: "" 
    },
    { 
      name: "cityCountry", 
      type: "string", 
      required: true, 
      defaultValue: "" 
    },
    { 
      name: "citizenship", 
      type: "string", 
      required: true, 
      defaultValue: "" 
    },
    { 
      name: "phone", 
      type: "string", 
      required: true, 
      defaultValue: "" 
    },
    { 
      name: "email", 
      type: "string", 
      required: true, 
      defaultValue: "" 
    },
    { 
      name: "website", 
      type: "string", 
      required: false, 
      defaultValue: "" 
    },
    { 
      name: "github", 
      type: "string", 
      required: false, 
      defaultValue: "" 
    },
    { 
      name: "linkedin", 
      type: "string", 
      required: false, 
      defaultValue: "" 
    },
    { 
      name: "experiences", 
      type: "array", 
      required: false, 
      defaultValue: [] 
    },
    { 
      name: "projects", 
      type: "array", 
      required: false, 
      defaultValue: [] 
    },
    { 
      name: "education", 
      type: "array", 
      required: false, 
      defaultValue: [] 
    },
    { 
      name: "skills", 
      type: "array", 
      required: false, 
      defaultValue: [] 
    }
  ],
  isActive: true
};

const minimalTemplate = {
  name: "Minimal CV",
  thumbnail: "/thumbnails/cv-minimal.png",
  category: "Curriculum Vitae",
  htmlContent: `
  <div class="container">
    <header>
      <h1>{{fullName}}</h1>
      <p>{{cityCountry}} · {{email}} · {{phone}}</p>
      <p><a href="{{linkedin}}">LinkedIn</a> · <a href="{{github}}">GitHub</a> · <a href="{{website}}">Portfólio</a></p>
    </header>

    {{#if experiences.length}}
    <section>
      <h2>Experiência</h2>
      {{#each experiences}}
        <div class="item">
          <h3>{{jobTitle}} – {{company}}</h3>
          <p class="period">{{startMonth}} – {{endMonth}} · {{location}}</p>
          <ul>{{#each responsibilities}}<li>{{this.text}}</li>{{/each}}</ul>
        </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if projects.length}}
    <section>
      <h2>Projetos</h2>
      {{#each projects}}
        <div class="item">
          <h3>{{name}}</h3>
          <p class="tech">{{technologies}}</p>
          <ul>{{#each descriptions}}<li>{{this.text}}</li>{{/each}}</ul>
        </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if education.length}}
    <section>
      <h2>Educação</h2>
      {{#each education}}
        <div class="item">
          <h3>{{university}}</h3>
          <p>{{degree}} ({{startMonth}} – {{endMonth}})</p>
        </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if skills.length}}
    <section>
      <h2>Competências</h2>
      <ul class="skills">{{#each skills}}<li>{{name}}</li>{{/each}}</ul>
    </section>
    {{/if}}
  </div>`,
  cssContent: `
  body { font-family: 'Inter', sans-serif; color: #222; background: #fff; }
  .container { width: 720px; margin: 40px auto; }
  header { text-align: center; margin-bottom: 20px; }
  header h1 { font-size: 28px; margin-bottom: 5px; }
  header a { color: #0070f3; text-decoration: none; }
  section { margin-top: 25px; }
  section h2 { border-bottom: 1px solid #ccc; padding-bottom: 3px; font-size: 18px; }
  .item { margin-bottom: 12px; }
  .period { font-size: 12px; color: #555; }
  ul { margin: 6px 0 0 20px; padding: 0; font-size: 13px; }
  `,
  variables: [...cvTemplate.variables],
  isActive: true
};

const corporateTemplate = {
  name: "Corporate CV",
  thumbnail: "/thumbnails/cv-corporate.png",
  category: "Curriculum Vitae",
  htmlContent: `
  <div class="cv">
    <aside>
      <h2>{{fullName}}</h2>
      <p>{{cityCountry}}</p>
      <p>{{email}}</p>
      <p>{{phone}}</p>
      <p><a href="{{linkedin}}">LinkedIn</a></p>
      <p><a href="{{github}}">GitHub</a></p>
      <p><a href="{{website}}">Portfólio</a></p>

      {{#if skills.length}}
      <h3>Habilidades</h3>
      <ul>{{#each skills}}<li>{{name}} — {{level}}</li>{{/each}}</ul>
      {{/if}}

      {{#if education.length}}
      <h3>Educação</h3>
      {{#each education}}
        <p><strong>{{degree}}</strong><br>{{university}}<br><small>{{startMonth}} – {{endMonth}}</small></p>
      {{/each}}
      {{/if}}
    </aside>

    <main>
      {{#if experiences.length}}
      <section>
        <h2>Experiência</h2>
        {{#each experiences}}
          <div class="item">
            <h3>{{jobTitle}} — {{company}}</h3>
            <span>{{startMonth}} – {{endMonth}}</span>
            <ul>{{#each responsibilities}}<li>{{text}}</li>{{/each}}</ul>
          </div>
        {{/each}}
      </section>
      {{/if}}

      {{#if projects.length}}
      <section>
        <h2>Projetos</h2>
        {{#each projects}}
          <div class="item">
            <h3>{{name}}</h3>
            <p>{{technologies}}</p>
            <ul>{{#each descriptions}}<li>{{text}}</li>{{/each}}</ul>
          </div>
        {{/each}}
      </section>
      {{/if}}
    </main>
  </div>`,
  cssContent: `
  body { font-family: 'Helvetica', sans-serif; background: #f4f4f4; }
  .cv { display: flex; width: 850px; margin: 30px auto; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
  aside { width: 30%; background: #1f2937; color: white; padding: 20px; }
  aside a { color: #93c5fd; text-decoration: none; }
  main { width: 70%; padding: 25px; }
  h2 { border-bottom: 2px solid #1f2937; margin-bottom: 10px; font-size: 18px; }
  .item { margin-bottom: 15px; }
  ul { margin-left: 18px; font-size: 13px; }
  `,
  variables: [...cvTemplate.variables],
  isActive: true
};

const creativeTemplate = {
  name: "Creative CV",
  thumbnail: "/thumbnails/cv-creative.png",
  category: "Curriculum Vitae",
  htmlContent: `
  <div class="cv">
    <header>
      <h1>{{fullName}}</h1>
      <p>{{cityCountry}} · {{email}} · {{phone}}</p>
      <p><a href="{{github}}">GitHub</a> | <a href="{{linkedin}}">LinkedIn</a></p>
    </header>

    {{#if experiences.length}}
    <section>
      <h2>💼 Experiência</h2>
      {{#each experiences}}
        <div class="item">
          <h3>{{company}}</h3>
          <p>{{jobTitle}} · {{location}} ({{startMonth}} – {{endMonth}})</p>
          <ul>{{#each responsibilities}}<li>{{this.text}}</li>{{/each}}</ul>
        </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if projects.length}}
    <section>
      <h2>🚀 Projetos</h2>
      {{#each projects}}
        <div class="item">
          <h3>{{name}}</h3>
          <p>{{technologies}}</p>
          <ul>{{#each descriptions}}<li>{{text}}</li>{{/each}}</ul>
        </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if skills.length}}
    <section>
      <h2>🧠 Habilidades</h2>
      <ul>{{#each skills}}<li>{{name}} - {{level}}</li>{{/each}}</ul>
    </section>
    {{/if}}
  </div>`,
  cssContent: `
  body { font-family: 'Poppins', sans-serif; background: #fafafa; color: #333; }
  .cv { width: 800px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  header { text-align: center; margin-bottom: 30px; }
  h1 { color: #2563eb; margin-bottom: 5px; }
  section { margin-bottom: 25px; }
  h2 { color: #1e3a8a; border-bottom: 2px solid #60a5fa; padding-bottom: 4px; }
  ul { margin-left: 20px; }
  li { margin-bottom: 5px; }
  `,
  variables: [...cvTemplate.variables],
  isActive: true
};



async function insertCompatibleTemplates() {
  try {
    const existingTemplate = await Template.findOne({ name: cvTemplate.name });
    if (!existingTemplate) {
      await Template.create(cvTemplate);
      console.log('Template CV inserido com sucesso!');
    } else {
      console.log('Template CV já existe no banco de dados');
    }

    const existingTemplate2 = await Template.findOne({ name: minimalTemplate.name });
    if (!existingTemplate2) {
      await Template.create(minimalTemplate);
      console.log('Template minimal inserido com sucesso!');
    } else {
      console.log('Template minimal já existe no banco de dados');
    }

     const existingTemplate3 = await Template.findOne({ name: corporateTemplate.name });
    if (!existingTemplate3) {
      await Template.create(corporateTemplate);
      console.log('Template corporate inserido com sucesso!');
    } else {
      console.log('Template corporate já existe no banco de dados');
    }

    const existingTemplate4 = await Template.findOne({ name: creativeTemplate.name });
    if (!existingTemplate4) {
      await Template.create(creativeTemplate);
      console.log('Template creative inserido com sucesso!');
    } else {
      console.log('Template creative já existe no banco de dados');
    }

  } catch (error) {
    console.error('Erro ao inserir template:', error);
  }
}

export default insertCompatibleTemplates;