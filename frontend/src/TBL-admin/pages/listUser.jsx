import ListUser from "../components/listUser";
import Navbar from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";

const ListUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ListUser />
      </div>
      <Footer />
    </main>
  );
};

export default ListUserPage;
