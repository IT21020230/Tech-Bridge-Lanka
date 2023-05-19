import AddUser from "../components/addUser";
import Navbar from "../../TBL/layout/Navbar/Navbar";
import Footer from "../../TBL/layout/Footer/Footer";

const AddUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <AddUser />
      </div>
      <Footer />
    </main>
  );
};

export default AddUserPage;
