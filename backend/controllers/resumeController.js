import { findResumeById, findPersonalDetailsById, getCompleteResume }from '../services/resumeService.js';
import { renderTemplate } from '../services/templateService.js';

// imports create
import { createResumeService, getAllResumesByUserService} from '../services/resumeService.js'
import { personalService } from '../services/resumeService.js'
import { experienceWorkService } from '../services/resumeService.js';
import { skillService } from '../services/resumeService.js';
import { educationService } from '../services/resumeService.js';

// imports editatios
import { 
  resume_Edit_Service,
  personaDatail_Edit_Service, 
  skills_Edit_Service, 
  education_Edit_Service, 
  experienceWork_Edit_Service  
} from '../services/resumeService.js';

// imports deletes
import {
  deleteResumeService,
  deletePersonalDetailsService,
  deleteWorkExperienceService,
  deleteSkillService,
  deleteEducationService,
  // deleteProjectsService
} from "../services/resumeService.js";

export async function createResume(req, res) {
  try {

    const { title } = req.body;
    const userId = req.session.userId;

    const resume = await createResumeService(userId, title);

    res.status(201).json({
      success: true,
      data: resume,
      message: "Resume criado com sucesso",
    });
  } catch (error) {
    console.error("Erro em createResume:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getResumesByUser(req, res) {
  try {
    const userId = req.session?.userId || req.session.userId; 
    
    const resumes = await getAllResumesByUserService(userId);
    res.status(200).json({
      success: true,
      data: resumes,
      message: "Currículos encontrados com sucesso.",
    });
  } catch (error) {
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
    const personalData = req.body;
    
    const result = await personalService(personalData, resumeId);
    
    res.json({
      success: true,
      data: result,
      message: 'Dados pessoais salvos com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export async function saveExperienceWorkController(req, res) {

    try {
      const { resumeId } = req.params;
      const XpWorkData = req.body;

      const createWorkXP = await experienceWorkService(XpWorkData, resumeId);

      res.json({
        success: true,
        data: createWorkXP,
        message: 'Experiências profissionais salvas com sucesso!'
      });

    } catch (error) {
      
      res.status(400).json({
      success: false,
      error: error.message
    });

    }

}

export async function saveEducationController(req, res) {

    try {
      const { resumeId } = req.params;
      const educationData = req.body;

      const createEducation = await educationService(educationData, resumeId);

      res.json({
        success: true,
        data: createEducation,
        message: 'Educação salvas com sucesso!'
      });

    } catch (error) {
      
      res.status(400).json({
      success: false,
      error: error.message
    });

    }

}

export async function saveSkillController(req, res) {

    try {
      const { resumeId } = req.params;
      const skillName = req.body;

      const createSkill = await skillService(skillName, resumeId);

      res.json({
        success: true,
        data: createSkill,
        message: 'Habilidades salvas com sucesso!'
      });

    } catch (error) {
      
      res.status(400).json({
      success: false,
      error: error.message
    });

    }

}

// editatios controllers

export async function updateResumeController(req, res) {
  try {
    const { resumeId} = req.params;
    const resumeData = req.body;
    
    const result = await resume_Edit_Service(resumeId, resumeData);
    
    res.json({
      success: true,
      data: result,
      message: 'currículo atualizado com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export async function updatePersonalDetailsController(req, res) {
  try {
    const { resumeId, personalDetailsId } = req.params;
    const personalDetailsData = req.body;
    
    const result = await personaDatail_Edit_Service(personalDetailsId, resumeId, personalDetailsData);

    res.json({
      success: true,
      data: result,
      message: 'Informações pessoais atualizadas com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export async function updateEducationController(req, res) {
  try {
    const { resumeId, educationId } = req.params;
    const educationData = req.body;
    
    const result = await education_Edit_Service(resumeId, educationId, educationData);
    
    res.json({
      success: true,
      data: result,
      message: 'Educação atualizada com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export async function updateSkillController(req, res) {
  try {
    const { resumeId, skillId } = req.params;
    const skillData = req.body;
    
    const result = await skills_Edit_Service(resumeId, skillId, skillData);
    
    res.json({
      success: true,
      data: result,
      message: 'Skills atualizadas com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

export async function updateExperienceController(req, res) {
  try {
    const { resumeId, expirienceId } = req.params;
    const expirienceData = req.body;
    
    const result = await experienceWork_Edit_Service(resumeId, expirienceId, expirienceData);
    
    res.json({
      success: true,
      data: result,
      message: 'Experiências de trabalho atualizadas com sucesso!'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

// delete controllers

export const deleteResumeController = async (req, res) => {
  try {
    const { id } = req.params; 
    await deleteResumeService(id);
    res.status(200).json({ success: true, message: "Currículo excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir currículo:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePersonalDetailsController = async (req, res) => {
  try {
    await deletePersonalDetailsService(req.params.personalDetailsId, req.params.resumeId);
    res.status(200).json({ success: true, message: "Personal details deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export const deleteExperienceWorkController = async (req, res) => {
  try {
    await deleteWorkExperienceService(req.params.experienceId, req.params.resumeId);
    res.status(200).json({ success: true, message: "Experience work deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export const deleteSkillsController = async (req, res) => {
  try {
    await deleteSkillService(req.params.skillId, req.params.resumeId);
    res.status(200).json({ success: true, message: "Skills deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export const deleteEducationController = async (req, res) => {
  try {
    await deleteEducationService(req.params.educationId, req.params.resumeId);
    res.status(200).json({ success: true, message: "Educatio deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
} 