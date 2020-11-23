import React from "react"
import { NavbarWrapper } from "../css"

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className="nav-center">
        <div className="nav-header">
            <img src="../images/logo.png" alt="Homepage" />
          <button
            type="button"
            className="logo-btn"
            // onClick={toggleNav}
            aria-label="Open Menu"
            data-cy="mobile-button"
          >
          </button>
        </div>
    </NavbarWrapper>
  )
}

export default Navbar;
