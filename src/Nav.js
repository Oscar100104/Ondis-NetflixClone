import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://res.cloudinary.com/dnsio9vml/image/upload/v1774948654/aa0ed93d-a2f9-4169-81b8-7621dfed8040-removebg-preview_eb13rq.png"
        alt="Netflix Logo"
      />

      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User Avatar"
      />
    </div>
  );
}

export default Nav;