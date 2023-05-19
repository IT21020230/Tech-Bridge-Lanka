import React from "react";
import VerifyUserCommunitiesList from "../../components/admin/VerifyUserCommunitiesList";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function VerifyUserCommunitiesListPage(){
    return(

        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <VerifyUserCommunitiesList />
        
      </div>
      <Footer />
    </main>
    )

}

export default VerifyUserCommunitiesListPage;

