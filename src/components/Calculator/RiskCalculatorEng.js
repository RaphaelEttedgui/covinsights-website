import React, { Component } from "react"
import RiskFormEng from "./RiskFormEng.js"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import Box from "@material-ui/core/Box"
import Chip from '@material-ui/core/Chip';
import DeleteIcon from "@material-ui/icons/Delete"
import CachedIcon from '@material-ui/icons/Cached';
import { IconButton, Button } from "@material-ui/core"
import Tooltip from '@material-ui/core/Tooltip';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { withStyles } from "@material-ui/core/styles";
import list_activities from '../constants/activitiesEng.js';
import FaceIcon from '@material-ui/icons/Face';
import { Person } from "./NewMath.js"
import { NavLink } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Evolution from './Evolution.js';
import * as Scroll from 'react-scroll';

/*
***** TODO *****
Faire que le globalRisk soit envoyé non pas au calcul, mais quand on appuie
sur un bouton "what does it mean for a family reunion"
(qui link du même coup au family reunion)

***** END TODO *****
*/

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
});

class RiskCalculatorEng extends Component {
  constructor(props){
    super(props);
    this.state = {blockActivities: [], activities: {}, nextId:0, risk:0, toggleResult:false, person: new Person(),
          evolution:()=><Evolution risk={0}/>, alpha:0.2, gamma:0.33}
    this.defaultActivityArgs = {
      name:"Activité",
      wearMask: false,
      duration:60,
      nbPeople: 1,
      nbMasked: 0,
      location:"indoors",
      talking: "normal",
      distance: "normal",
      riskProfile: "normal",
      showForm:false,
    }
    this.refResult = React.createRef();
  }

  updateRisk = (id, acti) => {
    var tabActis = this.state.activities;
    tabActis[id] =acti;
    this.setState({activities:tabActis});
  }

  getRisk = () => {
    // Updates the risk, and resets and updates the Person
    var p = this.state.person;
    p.clearActivityList();
    var result = 0;
    var mySum=0;
    for (var key in this.state.activities)
    {
      p.addActivity(this.state.activities[key]);
    }
    result = p.getRisk(); // The new risk

    this.setState({risk:result, person:p, evolution:() => {return (<Evolution riskList={p.activityList} alpha={this.state.alpha} gamma={this.state.gamma} /> )}});
    this.setState({toggleResult:true});
    // Updating the global value of the risk in Navbar
    // this.props.changeGlobalRisk(result);
  }

  toggleResult = () => {
    this.setState({toggleResult:true});
  }

  toggleOffResult = () => {
    this.setState({toggleResult:false});
  }
  
  reset = (event) => {
    this.setState({alpha:0.2, gamma:1/3});
  }

  // Affiche le résultat (appelé sur clic de calculer mon risque)
  // Contient le lien vers le simulateur et lui transmet le risque.
  showResult = () => {
    this.refResult.current.scrollIntoView({ behavior: "smooth" });
    const riskWeek = Math.round((this.state.risk * 10000 + Number.EPSILON)) / 100;
    var riskYear = 1 - Math.pow((1-this.state.risk), 52);
    riskYear = Math.round((riskYear * 10000 + Number.EPSILON)) / 100;
    return (
      <div id="calculator_result">
      <Box pt="1rem" justify="right" m="auto">
        You have <span style={{fontWeight:"bold", color:"red"}}>{riskWeek} %</span> chance of getting covid over a week, for a
         prevalence of {this.state.person.universe.prevalence}. That means <span style={{fontWeight:"bold", color:"red"}}>{riskYear} %</span> over a year.
      </Box>
      <div id="button_to_family">
      <NavLink to="/familyGathering/">
      <Fab
      onClick={() => {this.props.changeGlobalRisk(this.state.risk);}}
      variant="extended"
    >
      <GroupAddIcon />
      <Box p="0.5rem">Import in the family gathering simulator</Box>
    </Fab>
    </NavLink>
    </div>
    <div id="text_graph_result">
    Evolution of the epidemy over one month if everyone had the same risk profile (numbers in thousands) :
    </div>
    {/* On suppose que les activités correspondent environ à la durée d'incubation (1 semaine en l'occurence) */}
    <div id='graph_result'>{this.state.evolution()}</div>
  </div>
    )
  }

  addActivity = (args) => {
    const myId = [this.state.nextId]
    const widget = (
      <Grid item className="activity_list">
          <RiskFormEng id={myId} updateRisk={this.updateRisk} edit={this.toggleOffResult} {...args}>
              <div className="delete_button">
              <Tooltip title="Deleter">
              <IconButton aria-label="delete" size="small" onClick={() => this.clear(myId[0])}>
              <DeleteIcon />
              </IconButton>
              </Tooltip>
              </div>
          </RiskFormEng>
      </Grid>
    )
    this.setState({ nextId: this.state.nextId + 1 })
    var widgets = this.state.blockActivities.slice()
    widgets.push(widget)
    this.setState({ blockActivities: widgets })
  }

  // Premade activities are already filled.
  addPremadeActivity = (args) => {
    const myId = [this.state.nextId]
    const widget = (
      <Grid item className="activity_list">
          <RiskFormEng id={myId} showForm={true} updateRisk={this.updateRisk} edit={this.toggleOffResult} {...args}>
              <div className="delete_button">
              <Tooltip title="Supprimer">
              <IconButton z-index={5000} aria-label="delete" size="small" onClick={() => {this.clear(myId[0]); this.toggleOffResult()}}>
              <DeleteIcon />
              </IconButton>
              </Tooltip>
              </div>
          </RiskFormEng>
      </Grid>
    )
    this.setState({ nextId: this.state.nextId + 1 })
    var widgets = this.state.blockActivities.slice()
    widgets.push(widget)
    this.setState({ blockActivities: widgets })
  }

  componentDidMount = () => {
    //this.addActivity(this.defaultActivityArgs);
  }

  clearAll = () => {
    this.setState({ nextId: 0, blockActivities: [], activities: {}, risk:0, toggleResult:false});
    var p = this.state.person;
    p.clearActivityList();
    this.setState({person:p});
  }

  clear = id => {
    var widgets = this.state.blockActivities.slice();
    var myActis = this.state.activities;
    widgets[id] = <div />
    delete myActis[id];
    this.setState({ blockActivities: widgets, activities:myActis})
  }

  generatePremadeCards = () => {
    const { classes } = this.props;
    // sort premade cards
    list_activities.sort((a, b) => (a.name > b.name) ? 1 : -1);

    return (
      <div id="premade_cards" className={classes.root}>
          {list_activities.map((item, index) => {
            return (
                  <Chip icon={<FaceIcon />} label={item.name} clickable onClick={() => {this.addPremadeActivity(item); this.toggleOffResult()}} />
            )
          })}
      </div>
    )
  }

  render = () => {
    return (
      <div className="risk_calculator">
        <Grid container spacing={1} justify="center" alignitems="center">
          {this.state.blockActivities}
        </Grid>
        <div className="addActivity_buttons">
        <Box pt="1rem" justify="right" m="auto">
          <Grid container spacing={1}   alignItems="center" justify="center">
            <Grid item>
              <Fab
                onClick={() => {this.addActivity(this.defaultActivityArgs); this.toggleOffResult();}}
                color="primary"
                variant="extended"
              >
                <AddIcon />
                <Box p="0.5rem">New activity</Box>
              </Fab>
            </Grid>
            <Grid item>
              <Fab onClick={() => {this.clearAll(); this.toggleOffResult();}} color="secondary" variant="extended">
                <CachedIcon />
                <Box p="0.5rem">Reset</Box>
              </Fab>
            </Grid>
          </Grid>
        </Box>
        </div>
        <div className="addActivity_buttons">
        <Box pt="1rem" justify="right" m="auto">
          <Grid container spacing={1}   alignItems="center" justify="center">
            <Grid item>
              <Fab
                onClick={() => {this.getRisk(); this.toggleResult();}}
                variant="extended"
              >
                <TouchAppIcon />
                <Box p="0.5rem">Compute my risk</Box>
              </Fab>
            </Grid>
          </Grid>
        </Box>
        </div>
        <div id="premade_activities">
            {this.generatePremadeCards()}
        </div>

        <div id="calculator-result" ref={this.refResult}>
        {this.state.toggleResult && this.showResult()}
        </div>
        {this.state.toggleResult && Scroll.animateScroll.scrollToBottom({offset:100})}
        <br/><br/>
        <div className="disclaimer">
          <h3>Disclaimer</h3>
          This website was not peer-reviewed, and only represents the author's best estimations given the knowledge at hand. We are not experts in this topic by any
          means, even if we read many expert's papers. This website is not a primary information source about COVID.
          Do not use the tools from this website to take medical decisions. Keep following government recommendation.
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(RiskCalculatorEng);