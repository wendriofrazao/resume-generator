import Resume from '../models/Resume.js';
import PersonalDetails from '../models/PersonalDetails.js'

export async function personalService(data) {
    try {
    const requiredFields = [
    "fullName", "email", "phoneNumber",
    "country", "state", "city",
    "professionalSummary", "linkedInURL",
    "githubURL", "portfolioURL"
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

export async function findResumeById(resumeId){
 const result = await Resume.findById(resumeId).populate('templateId');
 return result
}

export async function findPersonalDetailsById(resumeId){
  const result = await PersonalDetails.findOne({ resumeId });
  return result
}