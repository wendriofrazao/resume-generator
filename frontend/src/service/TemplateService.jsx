// TemplateService.jsx - Atualize o caminho base
const API_URL = "http://localhost:5000";

export async function getAvailableTemplates() {
  try {
    console.log("📡 Fazendo requisição para templates...");
    
    const response = await fetch(`${API_URL}/api/templates/get-all-templates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("📊 Status da resposta:", response.status);
    console.log("📊 URL da requisição:", `${API_URL}/api/templates/get-all-templates`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro na resposta:", errorText);
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Dados recebidos:", data);
    return data;
    
  } catch (error) {
    console.error("💥 Erro completo ao buscar templates:", error);
    throw error;
  }
}

export async function getTemplatePreview(templateId) {
  try {
    console.log("📡 Buscando template:", templateId);
    
    const response = await fetch(`${API_URL}/api/templates/get-template-preview/${templateId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log("📊 Status do template:", response.status);
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    console.log("✅ Template recebido:", data);
    return data;
    
  } catch (error) {
    console.error("💥 Erro ao buscar template:", error);
    throw error;
  }
}

export async function getTemplateByName(templateName) {
  try {
    const response = await fetch(`${API_URL}/api/templates/get-template-by-name/${templateName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Erro ao buscar template por nome:", error);
    throw error;
  }
}