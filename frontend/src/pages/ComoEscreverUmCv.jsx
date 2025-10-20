import React from "react";
import { ConteinerComoEscreverUmCv } from "../components/ConteinerComoEscreverUmCv.jsx";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer.jsx";
export function ComoEscreverUmCv() {
    return (
        <div>
            <Header />
            <ConteinerComoEscreverUmCv/>
            <Footer />
        </div>
    );
}