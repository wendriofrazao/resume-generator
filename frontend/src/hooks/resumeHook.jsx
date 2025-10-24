// ResumeProvide.js
import { 
  personalDetails, 
  experienceWork, 
  education, 
  skills,
  removePersonalWork,
  removeExperienceWork
} from "../service/ResumeService.jsx";

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
          setError?.(err.message);
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
      
      
    }