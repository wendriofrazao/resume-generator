import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/userAuth.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastProvider } from './components/ui/use-toast.jsx'

import icon from "./assets/icon/Prancheta4.png";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const link = document.createElement("link");
link.rel = "icon";
link.href = icon;
document.head.appendChild(link);



if (!clientId) {
  console.error('Google Client ID não encontrado nas variáveis de ambiente');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
