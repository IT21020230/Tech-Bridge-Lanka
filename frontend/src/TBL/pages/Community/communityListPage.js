import CommunityList from "../../components/Community/communityList";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Sidebar from "../../layout/Slidebar/Slidebar";
import "../index.css";

const UserRegisterPage = () => {
  return (
    <main>
      <Navbar />
      <div className="content">
        <CommunityList />
      </div>
      <Footer />
    </main>
  );
};

export default UserRegisterPage;
