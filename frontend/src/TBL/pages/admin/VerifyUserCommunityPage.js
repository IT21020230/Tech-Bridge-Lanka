import React from "react";
import VerifyUserCommunity from "../../components/admin/VerifyUserCommunity";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";

function VerifyUserCommunityPage(){

    return(

        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <VerifyUserCommunity />
        
      </div>
      <Footer />
    </main>
    )
}

export default VerifyUserCommunityPage