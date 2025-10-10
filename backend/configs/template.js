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
    <link rel="stylesheet" href="cv.css" />
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
            <p class="role">{{this.jobTitle}} — {{this.location}}</p>
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
            <p class="degree">{{this.degree}} — {{this.location}}</p>
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
  margin-top: 30px;
}

section h2 {
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 3px;
  margin-bottom: 12px;
}

/* === ITEM === */
.item {
  margin-bottom: 18px;
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
}

/* === SKILLS === */
.skills {
  list-style: none;
  padding: 0;
}

.skills li {
  margin-bottom: 6px;
  font-size: 13px;
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

async function TemplateCv() {
  try {
    const existingTemplate = await Template.findOne({ name: cvTemplate.name });
    if (!existingTemplate) {
      await Template.create(cvTemplate);
      console.log('Template CV inserido com sucesso!');
    } else {
      console.log('Template CV já existe no banco de dados');
    }
  } catch (error) {
    console.error('Erro ao inserir template:', error);
  }
}

export default TemplateCv;