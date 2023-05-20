import EventById from "../../components/event/eventById";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <EventById />
      </div>
      <Footer />
    </main>
  );
};

export default ViewUserPage;
