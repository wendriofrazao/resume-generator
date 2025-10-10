import { personalService, findResumeById, findPersonalDetailsById, createResumeService, getCompleteResume }from '../services/resumeService.js';
import { renderTemplate, getTemplateByName } from '../services/templateService.js';
import Education from '../models/Education.js'
import Experience from '../models/WorkExperience.js'


export async function createResume(req, res) {
  try {

    const { title, templateName } = req.body;
    const userId = req.session.userId;

    const resume = await createResumeService(userId, title, templateName);

    res.status(201).json({
      success: true,
      data: resume,
      message: "Resume criado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro em createResume:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export async function generateResume(req, res) {
try{
const { resumeId } = req.params;

const resumeData = await getCompleteResume(resumeId);

const templateData = {
      fullName: resumeData.personalDetails?.fullName || '',
      cityCountry: `${resumeData.personalDetails?.city || ''}, ${resumeData.personalDetails?.country || ''}`,
      citizenship: resumeData.personalDetails?.country || '',
      phone: resumeData.personalDetails?.phoneNumber || '',
      email: resumeData.personalDetails?.email || '',
      website: resumeData.personalDetails?.portfolioURL || '',
      github: resumeData.personalDetails?.githubURL || '',
      linkedin: resumeData.personalDetails?.linkedInURL || '',
      experiences: resumeData.experiences || [],
      education: resumeData.education || [],
      projects: resumeData.projects || [],
      skills: resumeData.skills || []
    };

    const result = await renderTemplate(
      resumeData.resume.templateId, 
      templateData
    );
      
    res.json({
      success: true,
      html: result.html,
      css: result.css
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message
    });
  }
}

export async function previewTemplate(req, res) {
    try {
      const { templateId } = req.params;
      const { data } = req.body; 
      
      const result = await renderTemplate(templateId, data);
      
      res.json({
        ok: true,
        html: result.html,
        css: result.css
      });
      
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message
      });
    }
  }


export async function savePersonalDetails(req, res) {
  try {
    const { resumeId } = req.params;
    const personalData = { ...req.body, resumeId };
    
    const result = await personalService(personalData);
    
    res.json({
      success: true,
      data: result,
      message: 'Dados pessoais salvos com sucesso'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}