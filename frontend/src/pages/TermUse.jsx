import { UseTerm } from '../components/Termo';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import React from "react";

export function TermService() {
    return (
    <div>
        <Header/>
            <UseTerm/>
        <Footer/>
    </div>
    )
}