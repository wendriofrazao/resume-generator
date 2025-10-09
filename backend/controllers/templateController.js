import { getAvailableTemplates, getTemplateById } from '../services/templateService.js';

export async function listTemplates(req, res) {
  try {
    const templates = await getAvailableTemplates();
    
    res.json({
      ok: true,
      data: templates
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}

export async function getTemplate(req, res) {
  try {
    const { templateId } = req.params;
    const template = await getTemplateById(templateId);
    
    if (!template) {
      return res.status(404).json({
        ok: false,
        message: 'Template não encontrado'
      });
    }
    
    res.json({
      ok: true,
      data: {
        _id: template._id,
        name: template.name,
        thumbnail: template.thumbnail,
        category: template.category
      }
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}