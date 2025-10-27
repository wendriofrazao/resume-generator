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
export async function personalDetails(fullname, email, phone, city, state, country, summary, resumeId) {
  try {
    const response = await fetch(`http://localhost:5000/create-personalDetails/${resumeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fullname,
        email,
        phone,
        summary,
        location: { city, state, country } 
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
    body: JSON.stringify({ jobDegree, company, description, period }),
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
    body: JSON.stringify({ degree, institution, period, period }),
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


export async function editExperience(resumeId, experienceId) {
  const res = await fetch(`${API_URL}/updated-resume/${resumeId}/${experienceId}`, {
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


export async function editEducation(resumeId, educationId) {
  const res = await fetch(`${API_URL}/updated-resume/${resumeId}/${educationId}`, {
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


export async function editSkills(resumeId, skillId) {
  const res = await fetch(`${API_URL}/updated-resume/${resumeId}/${skillId}`, {
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


export async function editPersonal(resumeId, personalDetailsId) {
  const res = await fetch(`${API_URL}/updated-resume/${resumeId}/${personalDetailsId}`, {
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