import React from "react"
import { NavbarWrapper } from "../css"
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import RiskCalculator from "../pages/RiskCalculator.js"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

const Navbar = () => {

    const toggleNav = () => {
        document.querySelector('.nav-links').classList.toggle("show-nav");
    }

  return (
    <NavbarWrapper>
    <BrowserRouter>
      <div className="nav-center">
        <div className="nav-header">
            <img src={logo} alt="Homepage" />
            <button
            type="button"
            className="logo-btn"
            onClick={toggleNav}
            aria-label="Open Menu"
            data-cy="mobile-button"
            >
            <FormatAlignJustifyIcon className="logo-icon" />
            </button>
        </div>
        <ul className="nav-links">
                <li>
                <NavLink to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="/">Risk Calculator</NavLink>
                </li>
                <li>
                <NavLink to="/">Family gathering</NavLink>
                </li>
            </ul>
        <Switch>
        <Route path="/" component={RiskCalculator} exact/>
        <Route component={Error}/>
        </Switch>
        </div>
        </BrowserRouter>
    </NavbarWrapper>
  )
}

export default Navbar;
