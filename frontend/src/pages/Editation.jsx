import React from "react";
import { Edit } from "../components/ConteinerEdit";
import {PageHeader} from '../components/PageHeader';
import {LoggedHeader} from '../components/LoggedHeader';

export function Editation() {

    return (
        <>
            <LoggedHeader/>
            <PageHeader/>
            <Edit/>
        </>
    )

}