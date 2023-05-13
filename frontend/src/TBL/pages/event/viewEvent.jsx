import ViewEvent from "../../components/event/viewEvent";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const ViewUserPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <ViewEvent />
      </div>
      <Footer />
    </main>
  );
}

export default ViewUserPage;
