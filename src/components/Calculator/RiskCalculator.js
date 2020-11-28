import React, { Component } from "react"
import RiskForm from "./RiskForm.js"
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
import list_activities from '../constants/activities.js';
import FaceIcon from '@material-ui/icons/Face';
import { Person } from "./MyMath.js"
import { NavLink } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Evolution from './Evolution.js'

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

class RiskCalculator extends Component {
  constructor(props){
    super(props);
    this.state = {blockActivities: [], risks:{}, activities: {}, nextId:0, risk:0, toggleResult:false, person: new Person(), capped:false}
    this.defaultActivityArgs = {
      name:"Activité",
      wearMask: false,
      duration:60,
      nbPeople: 1,
      nbMasked: 0,
      outdoors: false,
      talking: "normal",
      distance: "normal",
      riskProfile: "normal",
      showForm:false,
    }
    this.refResult = React.createRef();
  }

  updateRisk = (id, risk, acti) => {
    var tab = this.state.risks;
    var tabActis = this.state.activities;
    tab[id] = risk;
    tabActis[id] =acti;
    this.setState({risks: tab, activities:tabActis});
  }

  getRisk = () => {
    // Updates the risk, and resets and updates the Person
    var p = this.state.person;
    p.clearActivityList();
    var result = 0;
    for (var key in this.state.risks)
    {
      result = result + (1-result)* this.state.risks[key];
    }
    for (var key in this.state.activities)
    {
      p.addActivity(this.state.activities[key]);
    }
    result = Math.round(result * 100);
    this.setState({risk:result, person:p});
    this.setState({toggleResult:true});
    // Updating the global value of the risk in Navbar
    // this.props.changeGlobalRisk(result);
  }

  toggleResult = () => {
    this.setState({toggleResult:true});
  }

  showCapped = () => {
    return (
    <div>(Capé à 50%. Notre méthode d'estimation n'est pas adaptée aux risques plus élevés).</div>
    )
  }

  // Affiche le résultat (appelé sur clic de calculer mon risque)
  // Contient le lien vers le simulateur et lui transmet le risque.
  showResult = () => {
    this.refResult.current.scrollIntoView();
    const riskWeek = Math.round((this.state.person.getRisk() * 10000 + Number.EPSILON)) / 100;
    var riskYear=0;
    for(var i=0; i<52;i++)
    {
      riskYear = riskYear + (1-riskYear)*this.state.person.getRisk();
    }
    riskYear = Math.round((riskYear * 10000 + Number.EPSILON)) / 100;
    return (
      <div id="calculator_result">
      <Box pt="1rem" justify="right" m="auto">
        Le score d'activités est {this.state.risk} %. Cela signifie {riskWeek} % de chance d'attraper le covid
        sur une semaine, pour une prévalence de {this.state.person.universe.prevalence}, et {riskYear} % sur un an.
      </Box>
      <div id="button_to_family">
      <NavLink to="/familyGathering/">
      <Fab
      onClick={() => {this.props.changeGlobalRisk(this.state.person.getRisk());}}
      variant="extended"
    >
      <GroupAddIcon />
      <Box p="0.5rem">Importer dans le simulateur de réunion familiale</Box>
    </Fab>
    </NavLink>
    </div>
    <div id="text_graph_result">
    Evolution de l'épidémie sur un mois si tout le monde a le même profil de risque (chiffres en milliers) :
    </div>
    {/* On suppose que les activités correspondent environ à la durée d'incubation (1 semaine en l'occurence) */}
    <div id='graph_result'><Evolution risk={this.state.risk/100}/></div>
    </div>
    )
  }

  addActivity = (args) => {
    const myId = [this.state.nextId]
    const widget = (
      <Grid item className="activity_list">
          <RiskForm id={myId} updateRisk={this.updateRisk} {...args}>
              <div className="delete_button">
              <Tooltip title="Supprimer">
              <IconButton aria-label="delete" size="small" onClick={() => this.clear(myId[0])}>
              <DeleteIcon />
              </IconButton>
              </Tooltip>
              </div>
          </RiskForm>
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
          <RiskForm id={myId} showForm={true} updateRisk={this.updateRisk} {...args}>
              <div className="delete_button">
              <Tooltip title="Supprimer">
              <IconButton z-index={5000} aria-label="delete" size="small" onClick={() => this.clear(myId[0])}>
              <DeleteIcon />
              </IconButton>
              </Tooltip>
              </div>
          </RiskForm>
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
    this.setState({ nextId: 0, blockActivities: [], risks:{}, activities: {}, risk:0, toggleResult:false, capped:false});
    var p = this.state.person;
    p.clearActivityList();
    this.setState({person:p});
  }

  clear = id => {
    var widgets = this.state.blockActivities.slice();
    var myRisks = this.state.risks;
    var myActis = this.state.activities;
    widgets[id] = <div />
    myRisks[id] = 0;
    delete myActis[id];
    this.setState({ blockActivities: widgets, risks:myRisks, activities:myActis, capped:false})
  }

  generatePremadeCards = () => {
    const { classes } = this.props;
    return (
      <div id="premade_cards" className={classes.root}>
          {list_activities.map((item, index) => {
            return (
                  <Chip icon={<FaceIcon />} label={item.name} clickable onClick={() => {this.addPremadeActivity(item)}} />
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
                onClick={() => {this.addActivity(this.defaultActivityArgs)}}
                color="primary"
                variant="extended"
              >
                <AddIcon />
                <Box p="0.5rem">Nouvelle activité</Box>
              </Fab>
            </Grid>
            <Grid item>
              <Fab onClick={this.clearAll} color="secondary" variant="extended">
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
                onClick={() => {this.getRisk(); this.toggleResult()}}
                variant="extended"
              >
                <TouchAppIcon />
                <Box p="0.5rem">Calculer mon risque</Box>
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
      </div>
    )
  }
}

export default withStyles(styles)(RiskCalculator);
