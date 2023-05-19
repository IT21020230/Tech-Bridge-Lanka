import React from "react";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";

import IssuesList from "../../components/admin/IssuesList";

function IssuesListPage(){
    
        return(
            <main>
        <Navbar />
        <div className="content">
            <Slidebar />
            <IssuesList />
            
        </div>
        <Footer />
        </main>
        )
        }
        export default IssuesListPage;