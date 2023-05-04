import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { useLogout } from "../../hooks/useLogout";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <h3>TBL</h3>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="/#">My work</a>
        <a href="/#">Blog</a>
        <a href="/#">About me</a>

        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
