import InfoUser from "../components/infoUser";
import Navbar from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";
import Sidebar from "../../TBL/layout/Slidebar/Slidebar";

const ListUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <Sidebar />
        <InfoUser />
      </div>
      <Footer />
    </main>
  );
};

export default ListUserPage;
