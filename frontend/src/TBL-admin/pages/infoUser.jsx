import InfoUser from "../components/infoUser";
import NavbarAdmin from "../Layout/NavbarAdmin/NavbarAdmin";
import Footer from "../../TBL/layout/Footer/Footer";

const ListUserPage = () => {
  return (
    <main className="app">
      <NavbarAdmin />
      <div className="content">
        <InfoUser />
      </div>
      <Footer />
    </main>
  );
};

export default ListUserPage;
