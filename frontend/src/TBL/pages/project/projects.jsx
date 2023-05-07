import Projects from "../../components/project/projects";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}

export default ViewUserPage;
