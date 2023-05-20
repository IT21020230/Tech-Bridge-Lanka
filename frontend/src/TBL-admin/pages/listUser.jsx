import ListUser from "../components/listUser";
import Navbar from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";
import Sidebar from "../../TBL/layout/Slidebar/Slidebar";

const ListUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ListUser />
        <Sidebar />
      </div>
      <Footer />
    </main>
  );
};

export default ListUserPage;
