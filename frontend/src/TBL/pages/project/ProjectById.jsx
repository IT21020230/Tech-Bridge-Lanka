import ProjectById from "../../components/project/projectsById";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ProjectById />
      </div>
      <Footer />
    </main>
  );
};

export default ViewUserPage;
