import Resume from '../models/Resume.js';
import { getTemplateByName } from './templateService.js';
import PersonalDetails from '../models/PersonalDetails.js'
import Experience from '../models/WorkExperience.js'
import Education from '../models/Education.js'
import Skill from '../models/Skill.js'


export async function createResumeService(userId, title, templateName = "CV Template") {
  try {
    const template = await getTemplateByName(templateName);

    if (!template) {
      throw new Error("Template não encontrado ou não está ativo");
    }

    const newResume = new Resume({
      userId,
      title,
      templateId: template._id,
    });

    const savedResume = await newResume.save();

    return savedResume;
  } catch (error) {
    throw error;
  }
}

export async function getCompleteResume(resumeId) {
  try {
    const resume = await Resume.findById(resumeId).populate('templateId');
    if (!resume) {
      throw new Error('Resume não encontrado');
    }

    const [
      personalDetails,
      experiences,
      education,
      //projects,
      skills
    ] = await Promise.all([
      PersonalDetails.findOne({ resumeId }),
      Experience.find({ resumeId }).sort({ startDate: -1 }), 
      Education.find({ resumeId }).sort({ startDate: -1 }),
      //Project.find({ resumeId }),
      Skill.find({ resumeId }) 
    ]);

    return {
      resume,
      personalDetails,
      experiences: experiences || [],
      education: education || [],
      //projects: projects || [],
      skills: skills || []
    };
  } catch (error) {
    throw error;
  }
}


export async function personalService(data) {
    try {
    const requiredFields = [
    "fullName", "email", "phoneNumber",
    "country", "state", "city",
    "professionalSummary",
    ];

  for (const field of requiredFields) {
    if (!data[field]) throw new Error(`O campo "${field}" é obrigatório.`);
  }

  const newPersonal = new PersonalDetails(data);
  return await newPersonal.save();

    } catch (error) {
        throw error;
    }
        
}

export async function findResumeById(resumeId) {
  const result = await Resume.findById(resumeId).populate('templateId').populate('userId');
  return result;
}

export async function findPersonalDetailsById(resumeId){
  const result = await PersonalDetails.findOne({ resumeId });
  return result
}