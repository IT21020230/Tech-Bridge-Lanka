import ListProjectById from "../../components/project/listProjectById";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ListProjectById />
      </div>
      <Footer />
    </main>
  );
};

export default ViewUserPage;
