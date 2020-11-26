import React, {Component} from 'react';
import { NavbarWrapper } from "../css"
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Divider from '@material-ui/core/Divider';
import Calculator from '../pages/calculator.js'
import Home from '../pages/home.js'
import FamilyGathering from '../pages/familyGathering.js'
import Error from '../pages/Error.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Body from './Body.js'

class Navbar extends Component{

    toggleNav = () => {

        document.querySelector('.nav-links').classList.toggle("show-nav");
    }

    render(){
        return (
            <div>
            <BrowserRouter>
            <NavbarWrapper>
            <Paper elevation={2} className="nav-center">
              <div className="nav-header">
                  <img src={logo} alt="Homepage" />
                  <button
                  type="button"
                  className="logo-btn"
                  onClick={() => this.toggleNav()}
                  aria-label="Open Menu"
                  data-cy="mobile-button"
                  >
                  <FormatAlignJustifyIcon className="logo-icon" />
                  </button>
              </div>
              <ul className="nav-links">
                      <Divider />
                      <li>
                      <NavLink onClick={this.toggleNav} to="/">Accueil</NavLink>
                      </li>
                      <Divider />
                      <li>
                      <NavLink onClick={this.toggleNav} to="/calculator">Calculateur de risque</NavLink>
                      </li>
                      <Divider />
                      <li>
                      <NavLink onClick={this.toggleNav} to="/familyGathering/">Réunion familiale</NavLink>
                      </li>
                      <Divider/>
                      <li>
                        <NavLink onClick={this.toggleNav} to="/">Sources</NavLink>
                      </li>
                  </ul>
              </Paper>
              </NavbarWrapper>
                <Body>
                  <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/calculator" component={Calculator} exact/>
                    <Route path="/familyGathering" component={FamilyGathering} />
                    <Route component={Error}/>
                  </Switch>
                </Body>
            </BrowserRouter>
            </div>
        )
    }
}
export default Navbar;