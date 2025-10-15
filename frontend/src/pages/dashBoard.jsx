import {LoggedHeader} from '../components/LoggedHeader'
import {PageHeader} from '../components/PageHeader'
import {Welcome} from '../components/Welcome'
import React from "react";


export function DashBoard (){

return (
<>
 <LoggedHeader/>
 <PageHeader/>
 <Welcome/> 
</>
)

}