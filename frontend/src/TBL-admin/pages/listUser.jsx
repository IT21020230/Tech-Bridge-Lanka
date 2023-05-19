import ListUser from "../components/listUser";
import NavbarAdmin from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";

const ListUserPage = () => {
  return (
    <main className="app">
      <NavbarAdmin />
      <div className="content">
        <ListUser />
      </div>
      <Footer />
    </main>
  );
};

export default ListUserPage;
