const API_URL = "http://localhost:5000";


// create resume
export async function createResume(title, templateName) {
  try {
    const response = await fetch("http://localhost:5000/create-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        templateName,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("resumeId", data.data._id);
      console.log("Resume criado e salvo:", data.data._id);
    } else {
      console.warn("Nenhum ID retornado pelo backend.");
    }

    return data;
  } catch (error) {
    console.error("Erro ao criar resume:", error.message);
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
      body: JSON.stringify({ fullname, email, phone, city, state, country, summary }),
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


export async function experienceWork(jobDegree, company, description, period) {
  const res = await fetch(`${API_URL}/create-experienceWork`, {
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

export async function education(degree, institution, destructive, period) {
  const res = await fetch(`${API_URL}/create-education`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ degree, institution, destructive, period }),
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  return await res.json();
}

export async function skills(fullname, email, phone, location, sumary) {
  const res = await fetch(`${API_URL}/create-skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password, phone, location, sumary }),
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  return await res.json();
}
