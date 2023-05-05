import Login from "../../components/user/login";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const LoginPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <Login />
      </div>
      <Footer />
    </main>
  );
};

export default LoginPage;
