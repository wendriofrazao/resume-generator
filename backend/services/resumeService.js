import Resume from '../models/Resume.js';
import { getTemplateByName } from './templateService.js';
import PersonalDetails from '../models/PersonalDetails.js'
import Experience from '../models/WorkExperience.js'
import Education from '../models/Education.js'
import Skill from '../models/Skill.js'


export async function createResumeService(userId, title, templateId = "68e95913596affb1bbb52718") {
  try {
    const newResume = new Resume({
      userId,
      title,
      templateId
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

export async function getAllResumesByUserService(userId) {
  try {
    const resumes = await Resume.find({ userId }).populate('templateId');
    return resumes;
  } catch (error) {
    throw new Error(`Erro ao buscar os currículos: ${error.message}`);
  }
}


// insering collections in resume

export async function personalService(data, resumeId) {
    try {

    const isVerifyResume = findResumeById(resumeId);

    if (!isVerifyResume || isVerifyResume == '') throw new Error('Id não correspondido ao currículo');      

        const requiredFields = ["fullname", "email", "phone", "summary"];

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

// services editatios

export async function resume_Edit_Service(resumeId, resumeData) {
  const existingDetails = await Resume.findOne({ 
    _id: resumeId
  });
  
  if (!existingDetails) {
    throw new Error('Currículo não foi encontrado');
  }
   return await Resume.findOneAndUpdate({resumeId}, resumeData,{ new: true, upsert: true });
}

export async function personaDatail_Edit_Service(personalDetailsId, resumeId, personal) {
  const existingDetails = await PersonalDetails.findOne({ 
    _id: personalDetailsId, 
    resumeId: resumeId 
  });
  
  if (!existingDetails) {
    throw new Error('Detalhes pessoais não encontrados para este currículo');
  }
  
  return await PersonalDetails.findOneAndUpdate(
    { _id: personalDetailsId, resumeId: resumeId }, 
    personal, 
    { new: true, runValidators: true }
  );
}

export async function experienceWork_Edit_Service(experienceId, resumeId, experience) {
  const existingDetails = await Experience.findOne({ 
    _id: experienceId, 
    resumeId: resumeId 
  });
  
  if (!existingDetails) {
    throw new Error('Detalhes de trabalho não encontrados para este currículo');
  }

  return await Experience.findOneAndUpdate({_id:experienceId , resumeId}, experience,{ new: true, upsert: true });
}

export async function education_Edit_Service(educationId, resumeId, education) {
   const existingDetails = await Experience.findOne({ 
    _id: educationId, 
    resumeId: resumeId 
  });
  
  if (!existingDetails) {
    throw new Error('Detalhes de trabalho não encontrados para este currículo');
  }

  return await Education.findOneAndUpdate({_id:educationId , resumeId}, education, {new: true, upsert: true})
}

export async function skills_Edit_Service(skillId, resumeId, skill) {
   const existingDetails = await Experience.findOne({ 
    _id: skillId, 
    resumeId: resumeId 
  });
  
  if (!existingDetails) {
    throw new Error('Detalhes de trabalho não encontrados para este currículo');
  }
 return await Skill.findOneAndUpdate({_id:skillId , resumeId}, skill, { new: true, upsert: true });
} 


// services delete
export async function deleteResumeService(resumeId) {
  return await Resume.findByIdAndDelete(resumeId);
};

export async function deletePersonalDetailsService(personalDetailsId, resumeId) {
  return await PersonalDetails.findOneAndDelete({_id: personalDetailsId, resumeId})
}

export async function deleteWorkExperienceService(experienceId, resumeId) {
  return await Experience.findOneAndDelete({ _id: experienceId, resumeId });
}

export async function deleteEducationService(educationId, resumeId) {
  return await Education.findOneAndDelete({ _id: educationId, resumeId });
}

export async function deleteSkillService(skillId, resumeId) {
  return await Skill.findOneAndDelete({ _id: skillId, resumeId });
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
