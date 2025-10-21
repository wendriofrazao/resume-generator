import React from "react";
import { Header } from "../components/Header";
import { LoggedHeader } from "../components/LoggedHeader";
import { Footer } from "../components/Footer.jsx";
import { Conteiner } from "../components/Conteiner.jsx";
import { useAuth } from "../hooks/userAuth.jsx";

export function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user ? <LoggedHeader /> : <Header/>}
      
      <Conteiner />
      <Footer />
    </div>
  );
}

