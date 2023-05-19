import React from "react";
import CreateProject from "../../components/admin/CreateProject";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function CreateIssuesPage(){


    return(
        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <CreateProject />
        
      </div>
      <Footer />
    </main>
    )
}


export default CreateIssuesPage;