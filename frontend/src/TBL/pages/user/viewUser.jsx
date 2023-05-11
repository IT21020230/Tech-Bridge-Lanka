import ViewUser from "../../components/user/viewUser";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
//import { useAuthContext } from "../../hooks/useAuthContext";

const ViewUserPage = () => {
  //const { user } = useAuthContext();
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ViewUser />
      </div>
      <Footer />
    </main>
  );
};

export default ViewUserPage;
