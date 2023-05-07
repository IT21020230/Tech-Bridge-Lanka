import CreateCommunity from "../../components/Community/createCommunity";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import "../index.css";

const UserRegisterPage = () => {
  return (
    <main>
      <Navbar />
      <div className="content">
        <CreateCommunity />
      </div>
      <Footer />
    </main>
  );
};

export default UserRegisterPage;
