import InfoUser from "../components/infoUser";
import Navbar from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";

const ListUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <InfoUser />
      </div>
      <Footer />
    </main>
  );
};

export default ListUserPage;
