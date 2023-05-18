import AddUser from "../components/addUser";
import NavbarAdmin from "../Layout/NavbarAdmin/NavbarAdmin";
import Footer from "../../TBL/layout/Footer/Footer";

const AddUserPage = () => {
  return (
    <main className="app">
      <NavbarAdmin />
      <div className="content">
        <AddUser />
      </div>
      <Footer />
    </main>
  );
};

export default AddUserPage;
