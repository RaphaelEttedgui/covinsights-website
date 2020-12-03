import React, {Component} from 'react';
import { NavbarWrapper } from "../css"
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Divider from '@material-ui/core/Divider';
import Calculator from '../pages/calculator.js';
import CalculatorEng from '../pages/calculatorEng.js';
import Insights from '../pages/insights.js';
import InsightsEng from '../pages/insightsEng.js';
import FamilyGathering from '../pages/familyGathering.js'
import FamilyGatheringEng from '../pages/familyGatheringEng.js'
import Error from '../pages/Error.js'
import WhitePaper from '../pages/WhitePaper.js'
import WhitePaperEng from '../pages/WhitePaperEng.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Body from './Body.js'
import Button from '@material-ui/core/Button'
import TranslateIcon from '@material-ui/icons/Translate';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Navbar extends Component{

  constructor(props)
  {
    super(props);
    // This state is passed to children component
    // -> Stores the user's risk profile.
    this.state = {globalRisk:0., calculator: ()=><Calculator changeGlobalRisk={this.changeGlobalRisk}/>,
        familyGathering: ()=><FamilyGathering globalRisk={0.} />, insights: () => <Insights />,
        whitepaper: () => <WhitePaper/>, french:true, menuAnchor:null}
  }

    handleClick = (event) => {
      this.setState({menuAnchor:event.currentTarget})
    }

    handleClose = () => {
      this.setState({menuAnchor:null});
    };

    switchToEnglish = () => {
      if(this.state.french)
      {
        this.setState({french:false});
        this.setState({calculator: ()=><CalculatorEng changeGlobalRisk={this.changeGlobalRisk}/>});
        this.setState({familyGathering: ()=><FamilyGatheringEng globalRisk={this.state.globalRisk} />});
        this.setState({insights: () => <InsightsEng />});
        this.setState({whitepaper: () => <WhitePaperEng />});
      }
    }

    switchToFrench = () => {
      if(!this.state.french)
      {
        this.setState({french:true});
        this.setState({calculator: ()=><Calculator changeGlobalRisk={this.changeGlobalRisk}/>});
        this.setState({familyGathering: ()=><FamilyGathering globalRisk={this.state.globalRisk} />});
        this.setState({insights: () => <Insights />});
        this.setState({whitepaper: () => <WhitePaper />});
      }
    }

    toggleNav = () => {

        document.querySelector('.nav-links').classList.toggle("show-nav");
    }

    changeGlobalRisk = (risk) => {
      console.log(risk);
      this.setState({familyGathering: () =><FamilyGathering globalRisk={risk}/>});
    }

    frenchMenu = () => {
      return (
        <ul className="nav-links">
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
          <NavLink onClick={this.toggleNav} to="/insights">Insights</NavLink>
        </li>
        <Divider/>
        <li>
          <NavLink onClick={this.toggleNav} to="/whitepaper">White Paper</NavLink>
        </li>
    </ul>
      )
    }

    englishMenu = () => {
      return (
        <ul className="nav-links">
        <Divider />
        <li>
        <NavLink onClick={this.toggleNav} to="/calculator">Risk calculator</NavLink>
        </li>
        <Divider />
        <li>
        <NavLink onClick={this.toggleNav} to="/familyGathering/">Family gathering</NavLink>
        </li>
        <Divider/>
        <li>
          <NavLink onClick={this.toggleNav} to="/insights">Insights</NavLink>
        </li>
        <Divider/>
        <li>
          <NavLink onClick={this.toggleNav} to="/whitepaper">White Paper</NavLink>
        </li>
    </ul>
      )
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
              <div className="translate_non_mobile">
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
              <TranslateIcon/>
              </Button>
              </div>
              {this.state.french ? this.frenchMenu() : this.englishMenu()}
              </Paper>
              <div className="translate_mobile">
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
              <TranslateIcon/>
              </Button>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={this.state.menuAnchor}
                keepMounted
                open={Boolean(this.state.menuAnchor)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={()=>{this.handleClose(); this.switchToFrench()}}>Français</MenuItem>
                <MenuItem onClick={()=>{this.handleClose(); this.switchToEnglish()}}>English</MenuItem>
              </Menu>              
              </NavbarWrapper>
                <Body>
                  <Switch>
                    <Route path="/" component={this.state.calculator} exact/>
                    <Route path="/insights" component={this.state.insights} />
                    <Route path="/calculator" component={this.state.calculator} exact/>
                    <Route path="/familyGathering" component={this.state.familyGathering} />
                    <Route path="/whitepaper" component={this.state.whitepaper}/>
                    <Route component={Error}/>
                  </Switch>
                </Body>
            </BrowserRouter>
            </div>
        )
    }
}
export default Navbar;