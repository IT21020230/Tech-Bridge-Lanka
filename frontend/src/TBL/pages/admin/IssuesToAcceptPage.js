import React from "react";

import IssuesToAccept from "../../components/admin/IssuesToAccept";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";

import AcceptDeclineBlog from "../../components/admin/AcceptDeclineBlog";

function IssuesToAcceptPage(){

    return(

        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <IssuesToAccept />
        
      </div>
      <Footer />
    </main>
    )
}

export default IssuesToAcceptPage