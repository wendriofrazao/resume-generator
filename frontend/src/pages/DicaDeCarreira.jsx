import React from "react";
import { ConteinerDicas } from "../components/ConteinerDicas.jsx";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer.jsx";
export function DicaDeCarreira() {
    return (
        <div>
            <Header />
            <ConteinerDicas/>
            <Footer />
        </div>
    );
}