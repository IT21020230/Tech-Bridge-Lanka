import React from "react";
import CreateIssues from "../../components/admin/CreateIssues";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function CreateIssuesPage(){


    return(
        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <CreateIssues />
        
      </div>
      <Footer />
    </main>
    )
}


export default CreateIssuesPage;