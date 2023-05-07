import Events from "../../components/event/events";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewEventsPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <Events />
      </div>
      <Footer />
    </main>
  );
}

export default ViewEventsPage;
