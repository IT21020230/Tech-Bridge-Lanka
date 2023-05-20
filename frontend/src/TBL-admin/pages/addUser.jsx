import AddUser from "../components/addUser";
import Navbar from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";
import Sidebar from "../../TBL/layout/Slidebar/Slidebar";

const AddUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <AddUser />
        <Sidebar />
      </div>
      <Footer />
    </main>
  );
};

export default AddUserPage;
