import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer.jsx";
import { Conteiner } from "../components/Conteiner.jsx";

export function Home() {
  return (
    <div>
      <Header />
      <Conteiner />
      <Footer />
    </div>
  );
}
