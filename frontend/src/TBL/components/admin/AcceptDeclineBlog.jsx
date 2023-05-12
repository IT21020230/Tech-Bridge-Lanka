import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function AcceptDeclineBlog(){

    const [apiData, setApiData] = useState([]);

    useEffect(() => {

        const getBlogData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
            const json = await response.json();

            if(response.ok){
                setApiData(json);
                console.log(json);
            }

            if (!response.ok){
                console.log(Error)
            }
            

        }
        getBlogData();
    },[]);

    return(
        <div>
            <h1>Blog title: {apiData.userId}</h1>
      <p>Blog description: {apiData.id}</p>
      <div>Blog:  {apiData.title}</div>
        </div>
    )



}

export default AcceptDeclineBlog;