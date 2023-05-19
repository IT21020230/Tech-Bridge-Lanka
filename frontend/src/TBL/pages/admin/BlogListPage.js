import React from "react";
import BlogPostList from "../../components/admin/BlogsList";
import Navbar from "../../layout/Navbar/Navbar";

import Slidebar from "../../layout/Slidebar/Slidebar";
import Footer from "../../layout/Footer/Footer";


function BlogListPage(){
    
        return(
            <main>
        <Navbar />
        <div className="content">
            <Slidebar />
            <BlogPostList />
            
        </div>
        <Footer />
        </main>
        )
    }

    export default BlogListPage;