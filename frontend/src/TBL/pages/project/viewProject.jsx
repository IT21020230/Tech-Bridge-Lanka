import ViewProject from "../../components/project/viewProject";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ViewProject />
      </div>
      <Footer />
    </main>
  );
}

export default ViewUserPage;
