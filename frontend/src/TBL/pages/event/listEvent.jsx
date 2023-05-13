import ListEvent from "../../components/event/listEvent";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ListEvent />
      </div>
      <Footer />
    </main>
  );
}

export default ViewUserPage;
