import React from "react";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";

import UpcomingEvents from "../../components/admin/UpcomingEvents";

function UpcomingEventsPage(){

    return(
        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <UpcomingEvents />
        
      </div>
      <Footer />
    </main>



    )




}

export default UpcomingEventsPage;