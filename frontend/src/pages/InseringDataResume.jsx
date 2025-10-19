import React from "react";
import { InseringDatasResume } from "../components/ConteinerInsering";
import {PageHeader} from '../components/PageHeader';
import {LoggedHeader} from '../components/LoggedHeader';

export function InseringData() {

    return (
        <>
            <LoggedHeader/>
            <PageHeader/>
            <InseringDatasResume/>
        </>
    )

}