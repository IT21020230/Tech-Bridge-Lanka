import SignUp from "../../components/user/signUp";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";

const SignUpPage = () => {
  return (
    <main className="app">
      <Navbar />
      <div className="content">
        <SignUp />
      </div>
      <Footer />
    </main>
  );
}

export default SignUpPage;
