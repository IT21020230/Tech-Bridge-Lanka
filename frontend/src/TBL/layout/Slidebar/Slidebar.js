import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Slidebar.css";

function Slidebar() {
  const navRef = useRef();
  return (
    <div className="sidebar" ref={navRef}>
      <a href="/#">Home</a>
      <a href="/#">My work</a>
      <a href="/#">Blog</a>
      <a href="/#">About me</a>
    </div>
  );
}

export default Slidebar;