import ListProject from "../../components/project/listProject";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ListProject />
      </div>
      <Footer />
    </main>
  );
}

export default ViewUserPage;
