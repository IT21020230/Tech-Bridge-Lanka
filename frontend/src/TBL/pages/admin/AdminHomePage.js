import React from "react";
import AdminHome from "../../components/admin/AdminHome";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function CreateIssuesPage(){


    return(
        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <AdminHome />
        
      </div>
      <Footer />
    </main>
    )
}


export default CreateIssuesPage;