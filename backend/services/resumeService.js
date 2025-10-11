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


// insering collections in resume

export async function personalService(data, resumeId) {
    try {

       const isVerifyResume = findResumeById(resumeId);

    if (!isVerifyResume || isVerifyResume == '') throw new Error('Id não correspondido ao currículo');      

        const requiredFields = ["fullName", "email", "phoneNumber", "professionalSummary"];

  for (const field of requiredFields) {
    if (!data[field]) throw new Error(`O campo "${field}" é obrigatório.`);
  }

  const { country, state, city } = data.location;

    if (!city || !state || !country)  throw new Error('Os campos de localidade precisam ser preenchidos')

  const newPersonal = await PersonalDetails.create({
      resumeId,
      ...data
  });
  return newPersonal;

    } catch (error) {
        throw error;
    }
        
}

export async function experienceWorkService(data, resumeId) {

  try {

    const isVerifyResume = findResumeById(resumeId);

    if (!isVerifyResume || isVerifyResume == '') throw new Error('Id não correspondido ao currículo');

    const experiences = [ 
      "jobDegree", "company", "description", "period"
    ];

    for (const xpWork of experiences) {
      if (!data[xpWork]) throw new Error(`O campo "${xpWork}" é obrigatório`);
    }

    const newXPWork = await Experience.create({
      resumeId,
      ...data
    });

    return newXPWork;

  } catch (error) {
    throw error;
  }

}

export async function educationService(data, resumeId) {

  try {

    const isVerifyResume = findResumeById(resumeId);

    if (!isVerifyResume || isVerifyResume == '') throw new Error('Id não correspondido ao currículo');

    const educations = [ 
      "degree", "institution", "description", "period"
    ];

    for (const learn of educations) {
      if (!data[learn]) throw new Error(`O campo "${learn}" é obrigatório`);
    }

    const newEducation = await Education.create({
      resumeId,
      ...data
    });

    return newEducation;

  } catch (error) {
    throw error;
  }

}

export async function skillService(data, resumeId) {

  try {

    const isVerifyResume = findResumeById(resumeId);

    if (!isVerifyResume || isVerifyResume == '') throw new Error('Id não correspondido ao currículo');

    if (!data) throw new Error(`O campo "Skill" é obrigatório`);

    const newSkill = await Skill.create({
      resumeId,
      ...data
    });

    return newSkill;

  } catch (error) {
    throw error;
  }

}

// finds
export async function findResumeById(resumeId) {
  const result = await Resume.findById(resumeId).populate('templateId').populate('userId');
  return result;
}

export async function findPersonalDetailsById(resumeId){
  const result = await PersonalDetails.findOne({ resumeId });
  return result;
}

export async function findExperienceWorkById(resumeId){
  const result = await Experience.findOne({ resumeId });
  return result;
}