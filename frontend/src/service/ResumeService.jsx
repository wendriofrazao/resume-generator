const API_URL = "http://localhost:5000";


export async function getResumes() {
  try {
    const response = await fetch("http://localhost:5000/get-all-resumes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Erro ao encontrar resume:", error.message);
    throw error;
  }
}

export const downloadResumePDF = async (resumeId) => {
  try {
    
    const response = await fetch(`http://localhost:5000/download-pdf/${resumeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error('Erro ao baixar PDF');
    }

    // Pegar o nome do arquivo do header
    const contentDisposition = response.headers.get('Content-Disposition');
    const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
    const fileName = fileNameMatch ? fileNameMatch[1] : 'curriculo.pdf';

    // Converter resposta em blob
    const blob = await response.blob();

    // Criar link temporário e fazer download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, fileName };
  } catch (error) {
    console.error('Erro ao baixar PDF:', error);
    return { success: false, error: error.message };
  }
};


export async function getPersonal() {
  try {
    const response = await fetch("http://localhost:5000/get-all-resumes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Erro ao encontrar resume:", error.message);
    throw error;
  }
}


// create resume
export async function createResume(title) {
  try {
    const response = await fetch("http://localhost:5000/create-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title
      }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro ao criar resume:", error.message);
    throw error;
  }
}

export async function deleteResume(id) {
  try {
    const response = await fetch(`${API_URL}/resume/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro ${response.status}: ${errText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao excluir resume:", error.message);
    throw error;
  }
}



// create a personal detail
export async function personalDetails(personalData) {
  try {
    const {
      fullname,
      email,
      phone,
      city,
      state,
      country,
      summary,
      website = "",
      github = "",
      linkedin = "",
      resumeId
    } = personalData;

    if (!resumeId) {
      throw new Error("resumeId é obrigatório no service");
    }

    const response = await fetch(`${API_URL}/create-personalDetails/${resumeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fullname,
        email,
        phone,
        summary,
        website,
        github,
        linkedin,
        location: { city, state, country }, 
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Erro ${response.status}: ${err}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Erro ao salvar dados pessoais: ${error.message}`);
  }
}


export async function experienceWork(jobDegree, company, description, period, resumeId) {
  const res = await fetch(`${API_URL}/create-experienceWork/${resumeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobDegree, company, description, period, resumeId }),
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  return await res.json();
}
 
export async function education(degree, institution, period, resumeId) {
  const res = await fetch(`${API_URL}/create-education/${resumeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ degree, institution, period, resumeId}),
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  return await res.json();
}

export async function skills(skillName, resumeId) {
  const res = await fetch(`${API_URL}/create-skills/${resumeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skillName }),
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  return await res.json();
}


// remoção dos dados das abas 

export async function removePersonalWork(resumeId, personalDetailsId) {
  const res = await fetch(`${API_URL}/personalDetails/${resumeId}/${personalDetailsId}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return null; 
  }
}

export async function removeExperienceWork(resumeId, experienceId) {
  const res = await fetch(`${API_URL}/experienceWork/${resumeId}/${experienceId}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return null; 
  }
}


export async function removeEducation(resumeId, educationId) {
  const res = await fetch(`${API_URL}/education/${resumeId}/${educationId}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return null; 
  }
}


export async function removeSkills(resumeId, skillId) {
  const res = await fetch(`${API_URL}/skills/${resumeId}/${skillId}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return null; 
  }
}


// edição das abas
export async function editResume(resumeId) {
  const res = await fetch(`${API_URL}/updated-resume/${resumeId}`, {
    method: "PUT",
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return null; 
  }
}

export async function updateResumeTemplate(resumeId, templateId) {
  try {
    const response = await fetch(`http://localhost:5000/update-resume-template/${resumeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ templateId }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro ${response.status}: ${errText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar template do resume:", error.message);
    throw error;
  }
}

export async function editPersonal(resumeId, personalDetailsId, data) {
  const res = await fetch(`${API_URL}/updated-personalDetails/${resumeId}/${personalDetailsId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
  return await res.json();
}


export async function editExperience(resumeId, experienceId, data) {
  const res = await fetch(`${API_URL}/updated-experienceWork/${resumeId}/${experienceId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  
  if (!res.ok || !result.success) {
    throw new Error(result.error || `Erro ${res.status}: falha ao atualizar`);
  }

  return result;
}


export async function editEducation(resumeId, educationId, data) {
  const res = await fetch(`${API_URL}/updated-education/${resumeId}/${educationId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.error || `Erro ${res.status}: falha ao atualizar`);
  }

  return result;
}


export async function editSkills(resumeId, skillId, data) {
  const res = await fetch(`${API_URL}/updated-skills/${resumeId}/${skillId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
  return await res.json();
}



export async function getCompleteResume(resumeId) {
  try {
    const response = await fetch(`http://localhost:5000/get-resume-complete/${resumeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Erro ${response.status}: ${err}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar currículo completo:", error.message);
    throw error;
  }
}


export async function updateResumeTitle(resumeId, title) {
  const res = await fetch(`http://localhost:5000/updated-resume/${resumeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
  return await res.json();
}