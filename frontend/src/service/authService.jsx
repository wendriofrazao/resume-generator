const API_URL = "http://localhost:5000/auth";
const API_URL_OTP = "http://localhost:5000/otp";

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

export async function Me(){
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });
  return res
}

// Enviar OTP
export async function sendOtp(email, otpType) {
  const res = await fetch(`${API_URL_OTP}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otpType }),
  });
  return res.json();  
}

// Verificar OTP
export async function verifyOtp(email, otp, otpType = 'verify') {
  const res = await fetch(`${API_URL_OTP}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, otpType}),
  });
  return res.json();
}

// Resetar senha
export async function resetPassword(email, newPassword, otpType = 'reset') {
  const res = await fetch(`${API_URL_OTP}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword, otpType }),
  });
  return res.json();
}
