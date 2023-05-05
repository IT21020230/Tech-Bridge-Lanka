import Test from "../../components/test";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import Sidebar from "../../Layout/Slidebar/Slidebar";
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
