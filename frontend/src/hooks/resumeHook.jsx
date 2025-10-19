// ResumeProvide.js
import { 
  personalDetails, 
  experienceWork, 
  education, 
  skills
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
      async ExperienceResumeProvide(data, setUser, setError, setLoading) {
        try {
          setLoading?.(true);
          const res = await experienceWork(data);
          if (res.user) setUser?.(res.user);
          return res;
        } catch (err) {
          setError?.(err.message);
          return { ok: false, message: err.message };
        } finally {
          setLoading?.(false);
        }
      }

      // insering education
      async EducationResumeProvide(data, setUser, setError, setLoading) {
        try {
          setLoading?.(true);
          const res = await education(data);
          if (res.user) setUser?.(res.user);
          return res;
        } catch (err) {
          setError?.(err.message);
          return { ok: false, message: err.message };
        } finally {
          setLoading?.(false);
        }
      }

      // insering skills
      async SkillsResumeProvide(data, setUser, setError, setLoading) {
        try {
          setLoading?.(true);
          const res = await skills(data);
          if (res.user) setUser?.(res.user);
          return res;
        } catch (err) {
          setError?.(err.message);
          return { ok: false, message: err.message };
        } finally {
          setLoading?.(false);
        }
      }
}
