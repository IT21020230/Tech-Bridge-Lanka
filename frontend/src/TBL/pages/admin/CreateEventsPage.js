import React from "react";
import CreateEvents from "../../components/admin/CreateEvents";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function CreateIssuesPage(){


    return(
        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <CreateEvents />
        
      </div>
      <Footer />
    </main>
    )
}


export default CreateIssuesPage;