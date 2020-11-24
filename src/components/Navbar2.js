import React, {Component} from 'react';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Divider from '@material-ui/core/Divider';
import Calculator from '../pages/calculator.js'
import Home from '../pages/home.js'
import FamilyGathering from '../pages/familyGathering.js'
import Error from '../pages/Error.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// This version has a drawer, which is easier to make swipeable.

class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {anchorEl:null};
    }

    handleClick = (event) => {
      this.setState({anchorEl : event.currentTarget});
    };

    handleClose = () => {
      this.setState({anchorEl:null});
    };

    render(){
        return (
            <div>
            <BrowserRouter>
            <NavbarWrapper>
            <div className="nav-center">
              <div className="nav-header">
                  <img src={logo} alt="Homepage" />
                  <button
                  type="button"
                  className="logo-btn"
                  onClick={this.handleClick}
                  aria-label="Open Menu"
                  data-cy="mobile-button"
                  >
                  <FormatAlignJustifyIcon className="logo-icon" />
                  </button>
              </div>
              <ul className="nav-links">
                      <Divider />
                      <li>
                      <NavLink to="/">Home</NavLink>
                      </li>
                      <Divider />
                      <li>
                      <NavLink to="/calculator">Risk Calculator</NavLink>
                      </li>
                      <Divider />
                      <li>
                      <NavLink to="/familyGathering/">Family gathering</NavLink>
                      </li>
                      <Divider />
                  </ul>
              </div>
              </NavbarWrapper>
                  <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/calculator" component={Calculator} exact/>
                    <Route path="/familyGathering" component={FamilyGathering} />
                    <Route component={Error}/>
                  </Switch>

            <Menu id="navigation-menu" anchorEl={this.anchorEl} keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}>
                <MenuItem>
                <NavLink to="/">Home</NavLink>
                </MenuItem>
                <MenuItem>
                <NavLink to="/calculator">Risk Calculator</NavLink>
                </MenuItem>
                <MenuItem>
                <NavLink to="/familyGathering/">Family gathering</NavLink>
                </MenuItem>
            </Menu>
            </BrowserRouter>

            </div>
        )
    }
}

export default Navbar;