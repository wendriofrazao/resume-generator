const API_URL = "http://localhost:5000/auth";

// Registro
export async function registerUser(fullname, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password }),
    credentials: "include", 
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erro ${res.status}: ${text}`);
  }
  return await res.json();
}

// Login
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    
  return await res.json();

}

// Logout
export async function logoutUser() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

// Enviar OTP
export async function sendOtp(email) {
  const res = await fetch(`${API_URL}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

// Verificar OTP
export async function verifyOtp(email, otp) {
  const res = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return res.json();
}

// Resetar senha
export async function resetPassword(email, newPassword) {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });
  return res.json();
}
