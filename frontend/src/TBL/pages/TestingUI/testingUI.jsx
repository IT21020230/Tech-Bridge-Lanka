import Test from "../../components/test";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import "../index.css";

const UserRegisterPage = () => {
  return (
    <main>
      <Navbar />
      <div className="content">
        <Sidebar />
        <Test />
      </div>
      <Footer />
    </main>
  );
};

export default UserRegisterPage;
