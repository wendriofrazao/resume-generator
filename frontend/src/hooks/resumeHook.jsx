import { 
  personalDetails, 
  experienceWork, 
  education, 
  skills,
  removePersonalWork,
  removeExperienceWork,
  removeEducation,
  removeSkills,
  editResume,
  editEducation,
  editPersonal,
  editSkills,
  editExperience,
  getCompleteResume
} from "../service/ResumeService.jsx";


import { 
  getAvailableTemplates, 
  getTemplatePreview, 
  getTemplateByName 
} from "../service/TemplateService.jsx";  

export class ResumeProvide {
      
  // insering personal
  async PersonalResumeProvide(fullname, email, phone, city, state, country, summary, resumeId) {
    try {
      const res = await personalDetails(fullname, email, phone, city, state, country, summary, resumeId);
      console.log("Resposta da API:", res);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  // insering experience
  async ExperienceResumeProvide(jobDegree, company, description, period, resumeId) {
    try {
      const res = await experienceWork(jobDegree, company, description, period, resumeId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    } 
  }

  // insering education
  async EducationResumeProvide(degree, institution, period, resumeId) {
    try {
      const res = await education(degree, institution, period, resumeId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    } 
  }

  // insering skills
  async SkillsResumeProvide(skillName, resumeId) {
    try {
      const res = await skills(skillName, resumeId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
  
  // remoções hooks
  
  async PersonalRemoveProvide(resumeId, personalDetailsId) {
    try {
      const res = await removePersonalWork(resumeId, personalDetailsId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
  

  async ExperienceRemoveProvide(resumeId, experienceId) {
    try {
      const res = await removeExperienceWork(resumeId, experienceId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }


  async EducationRemoveProvide(resumeId, educationId) {
    try {
      const res = await removeEducation(resumeId, educationId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    }
  } 

  
  async SkillsRemoveProvide(resumeId, skillId) {
    try {
      const res = await removeSkills(resumeId, skillId);
      return res;
    } catch (err) {
      return { ok: false, message: err.message };
    }
  } 


  async getAvailableTemplates() {
    try {
      const res = await getAvailableTemplates();
      return res;
    } catch(err) {
      console.error("Erro ao buscar templates:", err);
      return { ok: false, message: err.message };
    }
  }

  async getTemplatePreview(templateId) {
    try {
      const res = await getTemplatePreview(templateId); 
      return res;
    } catch(err) {
      console.error("Erro ao buscar template preview:", err);
      return { ok: false, message: err.message };
    }
  }

  async getTemplateByName(templateName) {
    try {
      const res = await getTemplateByName(templateName);
      return res;
    } catch(err) {
      console.error("Erro ao buscar template por nome:", err);
      return { ok: false, message: err.message };
    }
  }

  // edição do resume
  async EditationResume(resumeId) {
    try {
      const res = await editResume(resumeId);
      return res;
    } catch(err) {
      console.error("Erro ao editar um resume:", err);
      return { ok: false, message: err.message };
    }
  }


  async EditationPersonal(resumeId) {
    try {
      const res = await editPersonal(resumeId);
      return res;
    } catch(err) {
      console.error("Erro ao editar um resume:", err);
      return { ok: false, message: err.message };
    }
  }


  async EditationExperience(resumeId) {
    try {
      const res = await editExperience(resumeId);
      return res;
    } catch(err) {
      console.error("Erro ao editar um resume:", err);
      return { ok: false, message: err.message };
    }
  }


  async EditationEducation(resumeId) {
    try {
      const res = await editEducation(resumeId);
      return res;
    } catch(err) {
      console.error("Erro ao editar um resume:", err);
      return { ok: false, message: err.message };
    }
  }


  async EditationSkills(resumeId) {
    try {
      const res = await editSkills(resumeId);
      return res;
    } catch(err) {
      console.error("Erro ao editar um resume:", err);
      return { ok: false, message: err.message };
    }
  }


  async getResumeComplete(resumeId) {
  try {
    const res = await getCompleteResume(resumeId);
    return res;
  } catch (err) {
    console.error("Erro ao buscar currículo completo:", err);
    return { ok: false, message: err.message };
  }
}
}