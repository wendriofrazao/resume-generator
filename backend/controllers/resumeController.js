import { personalService, findResumeById, findPersonalDetailsById }from '../services/resumeService.js';
import { renderTemplate } from '../services/templateService.js';

export async function generateResume(req, res) {
try{
const { resumeId } = req.params;

const resume = await findResumeById(resumeId)
const personalDetails = await findPersonalDetailsById(resumeId)

const templateData = {personalDetails}

const result = await renderTemplate(
      resume.templateId, 
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

export async function personalController(req, res) {

    try {
        
    const {
      fullName,
      email,
      phoneNumber,
      country,
      state,
      city,
      professionalSummary,
      linkedInURL,
      githubURL,
      portfolioURL
    } = req.body

    
    const personal = await personalService(
            fullName,
            email,
            phoneNumber,
            country,
            state,
            city,
            professionalSummary,
            linkedInURL,
            githubURL,
            portfolioURL
        );

        res.status(201).json({
            success: true,
            message: 'Informações pesoais salvas com sucesso!',
            data: personal
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}