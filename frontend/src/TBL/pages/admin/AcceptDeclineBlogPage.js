import React from "react";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";

import AcceptDeclineBlog from "../../components/admin/AcceptDeclineBlog";

const AcceptDeclineBlogPage = () => {

    return(
        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <AcceptDeclineBlog />
        
      </div>
      <Footer />
    </main>
    )




}

export default AcceptDeclineBlogPage