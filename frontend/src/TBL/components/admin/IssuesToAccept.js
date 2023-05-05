import React from "react";
import { useState } from "react";



function IssuesToAccept(){
    const [apiData,setApiData] = useState([]);

    return (

        <>
        <div>

<h1>Issue</h1>

<h3>Issue topic:</h3>{apiData.title}
<h3>Issue details: </h3>{apiData.details}
<h3>Photograps: </h3>{apiData.photos}





</div>        
        
        </>
    )



}

export default IssuesToAccept;