import ListEventById from "../../components/event/listEventById";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ListEventById />
      </div>
      <Footer />
    </main>
  );
};

export default ViewUserPage;
