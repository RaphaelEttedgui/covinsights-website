import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Calculator from './pages/calculator.js'
import FamilyGathering from './pages/familyGathering.js'
import reportWebVitals from './reportWebVitals';
import Error from './pages/Error.js'
import Layout from './components/Layout';
import { NavbarWrapper } from "./css"
import logo from './images/logo.png';
import { NavLink } from 'react-router-dom';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

const toggleNav = () => {

  document.querySelector('.nav-links').classList.toggle("show-nav");
}

ReactDOM.render(
  <Layout>
  <NavbarWrapper>
    <div className="nav-center">
      <div className="nav-header">
          <img src={logo} alt="Homepage" />
          <button
          type="button"
          className="logo-btn"
          onClick={() => toggleNav()}
          aria-label="Open Menu"
          data-cy="mobile-button"
          >
          <FormatAlignJustifyIcon className="logo-icon" />
          </button>
      </div>
      <BrowserRouter>
      <ul className="nav-links">
              <li>
              <NavLink to="/">Home</NavLink>
              </li>
              <li>
              <NavLink to="/">Risk Calculator</NavLink>
              </li>
              <li>
              <NavLink to="/familyGathering/">Family gathering</NavLink>
              </li>
          </ul>
          <Switch>
            <Route path="/" component={Calculator} exact/>
            <Route path="/familyGathering" component={FamilyGathering} />
            <Route component={Error}/>
          </Switch>
      </BrowserRouter>
      </div>
  </NavbarWrapper>
  </Layout>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
