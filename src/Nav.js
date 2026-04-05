import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      
      {/* LEFT SIDE - Logo */}
      <div className="nav__left">
        <img
          className="nav__logo"
          src="https://res.cloudinary.com/dnsio9vml/image/upload/v1775393715/c154ba48-c5e5-4f14-b4f8-559a668eb894-removebg-preview_wl7eup.png"
          alt="Netflix Logo"
        />
      </div>

      {/* RIGHT SIDE - Profile */}
      <div className="nav__right">
        <div
          className="nav__profile"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            className="nav__avatar"
            src="https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-6/635631975_1399514558535570_13704498839586752_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGTa1gYRVMBcO_0SBOGCPgNJw_3OhQ8FXsnD_c6FDwVeymicOXeCLaK7YJ2ITY_CAjCZZa1dYVxILEgbxmSAy7_&_nc_ohc=ADFm8xIRx20Q7kNvwFfazEb&_nc_oc=AdpAf61BtYHGZPxeLXQ7R25L_twJSZA3wEmmIt2HTeR9ztN9JSGRt_Rw6hmI68dFvGI&_nc_zt=23&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=cyQb9T3-vOebb8i08T_dNA&_nc_ss=7a3a8&oh=00_Af0HJK_DJM5IHJMXWJ4gkH8woDWoBOHFQTMoA9_8nAGRXQ&oe=69D84BD8"
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
      </div>

    </div>
  );
}

export default Nav;