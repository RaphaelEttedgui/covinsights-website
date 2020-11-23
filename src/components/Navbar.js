import React from "react"
import { NavbarWrapper } from "../css"
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className="nav-center">
        <div className="nav-header">
            <img src={logo} alt="Homepage" />
          <button
            type="button"
            className="logo-btn"
            // onClick={toggleNav}
            aria-label="Open Menu"
            data-cy="mobile-button"
          >
          </button>
        </div>
        </div>
    </NavbarWrapper>
  )
}

export default Navbar;
