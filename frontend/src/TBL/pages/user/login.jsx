import Login from "../../components/user/login";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";

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
}

export default LoginPage;
