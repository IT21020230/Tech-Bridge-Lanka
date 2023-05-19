import React from "react";
import AcceptMembers from "../../components/admin/AcceptMembers";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function AcceptMembersPage(){
    return(

        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <AcceptMembers />
        
      </div>
      <Footer />
    </main>
    )

}

export default AcceptMembersPage;

