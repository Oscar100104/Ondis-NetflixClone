import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav({ setSearchTerm }) {
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>

      {/* LEFT SIDE */}
      <div className="nav__left">
        <img
          className="nav__logo"
          src="https://res.cloudinary.com/dnsio9vml/image/upload/v1774948654/aa0ed93d-a2f9-4169-81b8-7621dfed8040-removebg-preview_eb13rq.png"
          alt="Netflix Logo"
        />

        <ul className={`nav__menu ${menuOpen && "nav__menu--active"}`}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav__right">

        {/* SEARCH ICON */}
        <span
          className="nav__icon"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          🔍︎
        </span>

        {/* SEARCH INPUT */}
        {searchOpen && (
          <input
            className="nav__search"
            type="text"
            placeholder="Search movies..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {/* BELL ICON */}
        <span className="nav__icon">🔔</span>

        {/* PROFILE */}
        <div
          className="nav__profile"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            className="nav__avatar"
            src="https://res.cloudinary.com/dnsio9vml/image/upload/v1774974395/IMG_20250805_015209_157_lezviu.webp"
            alt="User Avatar"
          />

          {profileOpen && (
            <div className="nav__dropdown">
              <p>Account</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>

        {/* HAMBURGER MENU */}
        <span
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </span>

      </div>

    </div>
  );
}

export default Nav;