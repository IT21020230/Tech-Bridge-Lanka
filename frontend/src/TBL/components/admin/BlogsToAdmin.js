import React from "react";
import {StyleSheet} from 'react'
import { useEffect, useRef, useState } from 'react'



function BlogsToAdmin(){

    const [apiData,setApiData] = useState([]);




    return(

        <div>

            <h1>Blogs to confirm</h1>


            <table>
                <thead>
                    <tr>
                        <th>Blog Title</th>
                        <th>User</th>
                        <th>Date Uploaded</th>
                        <th>More</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {apiData.map((data) => (
                        <tr>
                            <th>
                               <td></td>
                               <td></td>
                               <td></td> 
                               <td></td> 
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
      
   
        </div>
    )
}

export default BlogsToAdmin;