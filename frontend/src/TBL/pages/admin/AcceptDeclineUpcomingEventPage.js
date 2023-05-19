import React from "react";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";

import AcceptDeclineUpcomingEvent from "../../components/admin/AcceptDeclineUpcomingEvent";

function AcceptDeclineUpcomingEventPage(){

    return(

        <main>
      <Navbar />
      <div className="content">
        <Slidebar />
        <AcceptDeclineUpcomingEvent />
        
      </div>
      <Footer />
    </main>
    )




}

export default AcceptDeclineUpcomingEventPage;