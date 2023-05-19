import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Slidebar.css";

function Slidebar() {
  const navRef = useRef();
  return (
    <div className="sidebar" ref={navRef}>
      <a href="/#">Home</a>
      <a href="/listUser">Manage Users</a>
      <a href="/blog-list-page">New Blogs</a>
      <a href="/verify-user-communities-list">New Communities</a>
      <a href="/issues-list-page">New Issues</a>
      <a href="/upcoming-events-list">Upcoming Events</a>
    </div>
  );
}

export default Slidebar;
