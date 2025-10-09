import Handlebars from 'handlebars';
import Template from '../models/Template.js';

export async function renderTemplate(templateId, data) {
  const template = await Template.findById(templateId);
  if (!template) {
    throw new Error('Template não encontrado');
  }

  const compiledTemplate = Handlebars.compile(template.htmlContent);
  const renderedHtml = compiledTemplate(data);
  
  return {
    html: renderedHtml,
    css: template.cssContent
  };
}

export async function getAvailableTemplates() {
  try {
    const templates = await Template.find({ isActive: true })
      .select('_id name thumbnail category')
      .sort({ name: 1 });
    
    return templates;
  } catch (error) {
    throw new Error(`Erro ao buscar templates: ${error.message}`);
  }
}

export async function getTemplateById(templateId) {
  try {
    return await Template.findOne({ _id: templateId, isActive: true });
  } catch (error) {
    throw new Error(`Erro ao buscar template: ${error.message}`);
  }
}